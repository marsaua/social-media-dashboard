import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { AppRouters } from "./AppRouters";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff7f50", // orange
    },
    secondary: {
      main: "#6b7280", // grey
    },
    background: {
      default: "#000000",
      paper: "#0a0a0a", // dark-grey
    },
    text: {
      primary: "#e5e7eb", // light-grey
    },
  },
  typography: {
    h1: {
      color: "white",
      fontSize: "2rem",
    },
    h3: {
      textTransform: "uppercase",
      fontSize: "1rem",
    },
    body1: {
      color: "#e5e7eb", // light-grey
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouters />
    </ThemeProvider>
  );
}

export default App;
