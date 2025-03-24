import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../../public/icons/Logo";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import SourceIcon from "@mui/icons-material/Source";
import TuneIcon from "@mui/icons-material/Tune";
import LogoutIcon from "@mui/icons-material/Logout";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";

export const Aside = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState();
  const location = useLocation();
  const handleAlignment = (e, newValue) => {
    setSelected(newValue);
  };

  const asideItem = {
    display: "flex",
    justifyContent: "flex-start",
    gap: "10px",
    width: "100%",
    textDecoration: "normal",
    border: "none",
  };
  useEffect(() => {
    if (location) {
      setSelected(location.pathname.slice(1));
    }
  }, [location.pathname]);

  return (
    <Box
      sx={{
        p: 5,
        borderRight: "1px dashed grey",
        width: "max-content",
        minHeight: "100vh",
      }}
    >
      <Box
        onClick={() => navigate("/")}
        value="logo"
        aria-label="logo"
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Logo />
        <Typography variant="h1">Socialwork</Typography>
      </Box>
      <ToggleButtonGroup
        orientation={"vertical"}
        sx={{ alignItems: "flex-start", width: "100%" }}
        exclusive
        color="primary"
        value={selected}
        onChange={handleAlignment}
      >
        <Typography variant={"h3"} color={grey[500]} sx={{ padding: "19px" }}>
          Social
        </Typography>
        <ToggleButton
          value="instagram"
          sx={{ ...asideItem }}
          onClick={() => navigate("/instagram")}
        >
          <InstagramIcon />
          <Typography>Instagram</Typography>
        </ToggleButton>
        <ToggleButton
          value="twitter"
          sx={{ ...asideItem }}
          onClick={() => navigate("/twitter")}
        >
          <XIcon />
          <Typography>Twitter</Typography>
        </ToggleButton>
        <ToggleButton
          value="facebook"
          sx={{ ...asideItem }}
          onClick={() => navigate("/facebook")}
        >
          <FacebookIcon />
          <Typography>Facebook</Typography>
        </ToggleButton>
        <ToggleButton
          value="youtube"
          sx={{ ...asideItem }}
          onClick={() => navigate("/youtube")}
        >
          <YouTubeIcon />
          <Typography>Youtube</Typography>
        </ToggleButton>

        <Typography variant={"h3"} color={grey[500]} sx={{ padding: "19px" }}>
          Menu
        </Typography>
        <ToggleButton
          value="statistic"
          sx={{ ...asideItem }}
          onClick={() => navigate("/statistic")}
        >
          <EqualizerIcon />
          <Typography>Statistics</Typography>
        </ToggleButton>
        <ToggleButton
          value="dashboard"
          sx={{ ...asideItem }}
          onClick={() => navigate("/dashboard")}
        >
          <SpaceDashboardIcon />
          <Typography>Dashboard</Typography>
        </ToggleButton>
        <ToggleButton
          value="documents"
          sx={{ ...asideItem }}
          onClick={() => navigate("/documents")}
        >
          <SourceIcon />
          <Typography>Documents</Typography>
        </ToggleButton>

        <Typography variant={"h3"} color={grey[500]} sx={{ padding: "19px" }}>
          Other
        </Typography>
        <ToggleButton
          value="settings"
          sx={{ ...asideItem }}
          onClick={() => navigate("/settings")}
        >
          <TuneIcon />
          <Typography>Settings</Typography>
        </ToggleButton>
        <ToggleButton
          value="logout"
          sx={{ ...asideItem }}
          onClick={() => navigate("/log")}
        >
          <LogoutIcon />
          <Typography>Log Out</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
