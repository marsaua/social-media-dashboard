declare module "@mui/material" {
  interface ThemeOptions {
    primary: string;
    text?: {
      secondary: {
        main: string;
      };
      primary: string;
    };
  }
}
