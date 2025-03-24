import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { Aside } from "@/components/Aside.tsx";

export const Layout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Aside />

      <Box sx={{ flexGrow: 1, padding: 5 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
