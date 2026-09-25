# CV/Resume

My CV in two forms: a [Preact](https://preactjs.com/) site and PDFs.

## The site

```
cd src
yarn install
yarn dev      # http://localhost:5173
yarn build    # -> src/dist
```

Deployed on Vercel.

## The PDFs

Two Typst sources, two PDFs:

| Source | PDF | Build |
| --- | --- | --- |
| `cv.typ` | `src/public/Nicolas-Riedel-CV.pdf` | `yarn cv` |
| `cv-academic.typ` | `src/public/Nicolas-Riedel-Academic-CV.pdf` | `yarn cv:academic` |

`cv.typ` is the industry CV, which the site links as *Download CV (PDF)*.
`cv-academic.typ` is the academic version. They share the industry
experience — keep those bullets in sync when either changes.

```
cd src && yarn cv    # needs: brew install typst
```

The PDFs are committed, so edit the `.typ`, re-run the build and commit both
together.

One catch: Typst resolves the `PT Serif` font against the system. Without it
`typst compile` warns and **still exits 0**, quietly producing a PDF in a
fallback font — which is why this is not wired into CI.
