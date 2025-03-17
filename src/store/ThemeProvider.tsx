import { createContext, useContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


const ThemeContext = createContext("dark");

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProviderWrapper({ children }) {
  const storedTheme = localStorage.getItem("theme") || "dark";
  const [themeMode, setThemeMode] = useState(storedTheme);

  const toggleTheme = () => {
    const newTheme = themeMode === "dark" ? "light" : "dark";
    setThemeMode(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          primary: {
            main: "#ff7f50", // orange
          },
          secondary: {
            main: "#6b7280", // grey
          },
          background: {
            default: themeMode === "dark" ? "#000000" : "#ffffff",
            paper: themeMode === "dark" ? "#0a0a0a" : "#f5f5f5",
          },
          text: {
            primary: themeMode === "dark" ? "#e5e7eb" : "#333333",
            secondary: "rgba(255, 255, 240, 0.3)",
          },
          divider: "rgba(255, 255, 240, 0.3)",
        },
        typography: {
          h1: {
            fontSize: "2rem",
          },
          h3: {
            textTransform: "capitalize",
            fontSize: "1rem",
          },
          body1: {
            textTransform: "capitalize",
          },
        },
      }),
    [themeMode]
  );

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
