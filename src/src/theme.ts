import { createTheme } from "@mui/material";
import { BG, CARD, DIM, GREEN, HARD, INK, LINE } from "./palette";

// A terminal look: nothing is rounded, and a shadow is an offset block rather
// than a blur.
export const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: BG, paper: CARD },
    text: { primary: INK, secondary: DIM },
    // The links, the icons and the CV button take the rain's green.
    primary: { main: GREEN },
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
