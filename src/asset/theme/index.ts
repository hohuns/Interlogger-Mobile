import { extendTheme } from "native-base";

export const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: "#E3F2F9",
      100: "#C5E4F3",
      200: "#A2D4EC",
      300: "#7AC1E4",
      400: "#47A9DA",
      500: "#0088CC",
      600: "#007AB8",
      700: "#006BA1",
      800: "#005885",
      900: "#003F5E",
    },
    secondary: {
      50: "#dfe3ec",
      100: "#d0d5e2",
      200: "#8190b1",
      300: "#7182a8",
      400: "#61749e",
      500: "#57698e",
      600: "#4e5d7e",
      700: "#44516f",
      800: "#3a465f",
      900: "#374259",
    },
    // Redefining only one shade, rest of the color will remain same.
    amber: {
      400: "#d97706",
    },
    jade: {
      400: "#1B9C85",
    },
    purple: {
      400: "#4C4C6D",
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: "dark",
  },
});
