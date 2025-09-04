import { createTheme, type PaletteColor, type PaletteColorOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    customColors: Record<string, PaletteColor>;
  }
  interface PaletteOptions {
    customColors?: Record<string, PaletteColorOptions>;
  }
}

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#0E6872",
    },
    customColors: {
      terciary: {
        main: "#8DC740"
      }
    }
  },
});
