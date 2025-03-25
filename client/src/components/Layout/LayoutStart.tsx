import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

export const LayoutStart = () => {
  const blackOverlay = {
    "::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      display: "block",
      width: "100%",
      height: "100%",
      backgroundColor: "black",
      opacity: 0.5,
    },
  };
  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          position: "relative",
          background: "url(./bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          ...blackOverlay,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 3,
            width: "100%",
            padding: "0 100px",
          }}
        >
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            Feel the pulse
          </Typography>
          <Typography variant="h4">
            Discover where your content resonates and how your audience reacts,
            day by day.
          </Typography>
        </Box>
      </Box>

      <Outlet />
    </Box>
  );
};
