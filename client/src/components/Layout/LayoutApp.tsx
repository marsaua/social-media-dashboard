import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

export const LayoutApp = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};
