# CV/Resume

My CV in two forms: a [Preact](https://preactjs.com/) site and a PDF.

## The site

```
cd src
yarn install
yarn dev      # http://localhost:5173
yarn build    # -> src/dist
```

Deployed on Vercel.

## The PDF

`cv.typ` is the source. It compiles with [Typst](https://typst.app) into
`src/public/Nicolas-Riedel-CV.pdf`, which the site links as *View full CV*:

```
cd src && yarn cv    # needs: brew install typst
```

The PDF is committed, so edit `cv.typ`, re-run `yarn cv` and commit both
together.

One catch: Typst resolves the `PT Serif` font against the system. Without it
`typst compile` warns and **still exits 0**, quietly producing a PDF in a
fallback font — which is why this is not wired into CI.
