import { createTheme } from "@mui/material";

// Keep in step with the custom properties in index.css. Duplicating five hex
// strings beats reading them back out of getComputedStyle: the theme module is
// evaluated before the stylesheet is injected, so that only ever returned the
// fallbacks.
const BG = "#0d0d0f";
const CARD = "#14141a";
const INK = "#e8e6e3";
const DIM = "#96938c";
const LINE = "#2c2c35";
const HARD = "#000000";

// A terminal look: nothing is rounded, and a shadow is an offset block rather
// than a blur.
export const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: BG, paper: CARD },
    text: { primary: INK, secondary: DIM },
  },
  shape: { borderRadius: 0 },
  typography: { fontFamily: '"space mono", monospace' },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          // MUI paints dark elevation as a background image; we want the flat
          // colour with a hard border instead.
          backgroundImage: "none",
          border: `1px solid ${LINE}`,
          boxShadow: `6px 6px 0 ${HARD}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { boxShadow: `3px 3px 0 ${HARD}` },
      },
    },
  },
});
