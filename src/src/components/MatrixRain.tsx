import { useEffect, useRef } from "preact/hooks";
import { BG, GREEN, RAIN_TRAIL } from "../palette";

// ASCII only: the page is Space Mono, which has no katakana, so the iconic
// half-width glyphs would come out as tofu.
const GLYPHS = "01<>[]{}()/\\|=+*-_$#@%&?!:;.abcdefghijklmnopqrstuvwxyz";
const CELL = 14;
const FPS = 18; // falling type does not need 60, and this is a background
const TRAIL = 0.085; // how much of the ground is painted back each frame
const RESPAWN = 0.975; // chance a column that ran off the bottom keeps falling
const PRIME_FRAMES = 90; // arrive mid-storm instead of watching it start empty

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const still =
      typeof matchMedia === "function" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;

    let heads: number[] = [];
    let frame = 0;
    let last = 0;

    const glyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

    const draw = () => {
      // Painting the ground back at low alpha, rather than clearing, is what
      // leaves the tail behind each head.
      ctx.globalAlpha = TRAIL;
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      ctx.globalAlpha = 1;

      for (let i = 0; i < heads.length; i++) {
        const x = i * CELL;
        const y = heads[i] * CELL;
        ctx.fillStyle = GREEN;
        ctx.fillText(glyph(), x, y);
        ctx.fillStyle = RAIN_TRAIL;
        ctx.fillText(glyph(), x, y - CELL);

        heads[i] =
          y > canvas.clientHeight && Math.random() > RESPAWN ? 0 : heads[i] + 1;
      }
    };

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${CELL}px "space mono", monospace`;
      ctx.textBaseline = "top";

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);
      heads = Array.from({ length: Math.ceil(w / CELL) }, () =>
        Math.floor(Math.random() * (h / CELL)),
      );
      for (let i = 0; i < PRIME_FRAMES; i++) draw();
    };

    resize();
    window.addEventListener("resize", resize);

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (now - last < 1000 / FPS) return;
      last = now;
      draw();
    };
    if (!still) frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} class="matrixRain" aria-hidden="true" />;
}
