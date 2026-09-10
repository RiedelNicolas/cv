import { useEffect, useRef, useState } from "preact/hooks";
import { Avatar } from "@mui/material";

// The portrait is 288x288 with no alpha channel, so the field is masked to a
// circle -- the same crop the MUI Avatar was already applying by CSS. STEP 2
// leaves ~16k particles, which reads as a face; see the spike in the PR.
const SRC_SIZE = 288;
const STEP = 2;
const FRUSTUM = 1.3; // world half-width; > 1 leaves room for the scatter
const ASSEMBLE_MS = 1400;

// ponytail: round points have to span the diagonal of the sample grid to close
// the gaps between them, hence > sqrt(2). Nudge it if the field looks gappy
// (raise) or muddy (lower) after changing STEP.
const POINT_SCALE = 1.5;

// How the cursor pushes. World units, where the face has radius 1. Both are
// meant to be tuned by eye -- how much "making way" reads as deliberate is not
// a calculation.
//
// The pocket comes out star-shaped, and that is wanted. Particles sit on a
// square grid, so pushing them radially piles them into a thin ring whose
// 4-fold symmetry shows. Jittering the sample positions rounds the pocket off,
// but it also breaks the tiling and speckles the face at rest -- so the grid,
// and the star, stay.
const REACH = 0.45;
const SHOVE = 0.08;

// A particle fades in over the last stretch of its trip home. Visibility is
// tied to how far it still has to travel, not to where it is on screen, so it
// crosses the canvas edge invisible instead of popping in along the rectangle.
const FADE_SPAN = 0.45;

const VERTEX = `
  attribute vec3 aScatter;
  attribute vec3 aColor;
  uniform vec2 uMouse;
  uniform float uProgress;
  uniform float uPointSize;
  uniform float uReach;
  uniform float uShove;
  uniform float uFadeSpan;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;
    vec3 p = mix(aScatter, position, uProgress);

    // Measured before the repel, so pushing a particle aside does not fade it.
    vAlpha = 1.0 - smoothstep(0.0, uFadeSpan, length(position - p));

    // Repelling as a pure function of the distance to the cursor means there
    // is no per-particle velocity to store, and so no simulation to step on
    // the CPU -- 16k particles cost nothing per frame.
    // GLSL smoothstep is undefined for edge0 >= edge1, so the falloff has to
    // be written the way round the spec allows and then inverted.
    vec2 away = p.xy - uMouse;
    float falloff = 1.0 - smoothstep(0.0, uReach, length(away));
    p.xy += normalize(away + vec2(0.0001)) * falloff * uShove;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uPointSize;
  }
`;

const FRAGMENT = `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard; // round points
    gl_FragColor = vec4(vColor, vAlpha);
  }
`;

function sampleImage(img: HTMLImageElement) {
  const scratch = document.createElement("canvas");
  scratch.width = scratch.height = SRC_SIZE;
  const ctx = scratch.getContext("2d");
  if (!ctx) throw new Error("no 2d context");
  ctx.drawImage(img, 0, 0, SRC_SIZE, SRC_SIZE);
  const px = ctx.getImageData(0, 0, SRC_SIZE, SRC_SIZE).data;

  const radius = SRC_SIZE / 2;
  const home: number[] = [];
  const scatter: number[] = [];
  const colors: number[] = [];

  for (let y = 0; y < SRC_SIZE; y += STEP) {
    for (let x = 0; x < SRC_SIZE; x += STEP) {
      const dx = x - radius;
      const dy = y - radius;
      if (dx * dx + dy * dy > radius * radius) continue;

      const i = (y * SRC_SIZE + x) * 4;
      // ponytail: today's portrait is opaque, so this skips nothing. Drop in a
      // cut-out PNG and the silhouette comes for free, with no code change.
      if (px[i + 3] < 128) continue;

      home.push(dx / radius, -dy / radius, 0);
      colors.push(px[i] / 255, px[i + 1] / 255, px[i + 2] / 255);

      const angle = Math.random() * Math.PI * 2;
      const dist = 1.1 + Math.random() * 0.9;
      scatter.push(Math.cos(angle) * dist, Math.sin(angle) * dist, 0);
    }
  }

  return { home, scatter, colors };
}

export function ParticleAvatar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [unsupported, setUnsupported] = useState(false);

  const reduceMotion =
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // reduced motion or a failed init renders the <Avatar>

    let frame = 0;
    let stopped = false;
    let teardown = () => {};

    (async () => {
      try {
        // Dynamic: three.js is ~155KB gzipped and must not delay the CV text.
        const THREE = await import("three");

        const img = new Image();
        img.src = "/profile.png";
        await img.decode();
        if (stopped) return;

        const { home, scatter, colors } = sampleImage(img);

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(
          -FRUSTUM, FRUSTUM, FRUSTUM, -FRUSTUM, 0.1, 10,
        );
        camera.position.z = 2;

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(home, 3));
        geometry.setAttribute("aScatter", new THREE.Float32BufferAttribute(scatter, 3));
        geometry.setAttribute("aColor", new THREE.Float32BufferAttribute(colors, 3));

        const uniforms = {
          uMouse: { value: new THREE.Vector2(99, 99) }, // offscreen: no force
          uProgress: { value: 0 },
          uPointSize: { value: 2 },
          uReach: { value: REACH },
          uShove: { value: SHOVE },
          uFadeSpan: { value: FADE_SPAN },
        };
        const material = new THREE.ShaderMaterial({
          vertexShader: VERTEX,
          fragmentShader: FRAGMENT,
          uniforms,
          transparent: true,
          // Every particle sits at z = 0, so there is nothing to sort.
          depthWrite: false,
        });
        scene.add(new THREE.Points(geometry, material));

        const resize = () => {
          const side = canvas.clientWidth || 256;
          renderer.setSize(side, side, false);
          const pxPerUnit = (side * renderer.getPixelRatio()) / (FRUSTUM * 2);
          // home positions are normalised so SRC_SIZE/2 source px = 1 unit
          const spacing = STEP / (SRC_SIZE / 2);
          uniforms.uPointSize.value = spacing * pxPerUnit * POINT_SCALE;
        };
        const observer = new ResizeObserver(resize);
        observer.observe(canvas);
        resize();

        const target = new THREE.Vector2(99, 99);
        let seenPointer = false;
        const onMove = (event: PointerEvent) => {
          const box = canvas.getBoundingClientRect();
          target.set(
            (((event.clientX - box.left) / box.width) * 2 - 1) * FRUSTUM,
            -(((event.clientY - box.top) / box.height) * 2 - 1) * FRUSTUM,
          );
          // Snapping the first time: lerping in from the offscreen sentinel
          // would drag a shove straight across the face on the way.
          if (!seenPointer) {
            seenPointer = true;
            uniforms.uMouse.value.copy(target);
          }
        };
        const onLeave = () => {
          seenPointer = false;
          target.set(99, 99);
          uniforms.uMouse.value.set(99, 99);
        };
        window.addEventListener("pointermove", onMove);
        document.addEventListener("pointerleave", onLeave);

        // Not const: a click rewinds it, which replays the assemble.
        let started = performance.now();
        const onPress = () => { started = performance.now(); };
        canvas.addEventListener("pointerdown", onPress);
        const mouse = uniforms.uMouse.value;
        const tick = () => {
          frame = requestAnimationFrame(tick);
          const t = Math.min(1, (performance.now() - started) / ASSEMBLE_MS);
          uniforms.uProgress.value = 1 - Math.pow(1 - t, 3); // easeOutCubic
          const settling = mouse.distanceTo(target) > 0.001;
          mouse.lerp(target, 0.12); // smooths the cursor into a spring
          // Idle: assembled and the cursor at rest, so stop feeding the GPU.
          if (t < 1 || settling) renderer.render(scene, camera);
        };
        tick();

        teardown = () => {
          observer.disconnect();
          window.removeEventListener("pointermove", onMove);
          document.removeEventListener("pointerleave", onLeave);
          canvas.removeEventListener("pointerdown", onPress);
          geometry.dispose();
          material.dispose();
          renderer.dispose();
        };
      } catch {
        setUnsupported(true); // no WebGL, or the portrait failed to decode
      }
    })();

    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      teardown();
    };
  }, []);

  if (reduceMotion || unsupported) {
    return <Avatar src="/profile.png" id="avatarElement" />;
  }
  // No #avatarElement here: that ID rule caps the box at 256px and would
  // shrink the disc by the frustum margin. Sizing lives in .particleAvatar.
  return <canvas ref={canvasRef} class="particleAvatar" />;
}
