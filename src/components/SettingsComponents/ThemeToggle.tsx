import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import { ThemeContextType, useTheme } from "../../store/ThemeProvider";

export const ThemeToggle = () => {
  const { themeMode, toggleTheme }: ThemeContextType = useTheme();

  return (
    <Stack spacing={2} direction={"row"} sx={{ alignItems: "center" }}>
      <Switch
        checked={themeMode === "dark"}
        onChange={toggleTheme}
        aria-label="Dark Mode"
      />
      <Typography>
        {themeMode === "dark" ? "Dark Mode" : "Light Mode"}
      </Typography>
    </Stack>
  );
};
