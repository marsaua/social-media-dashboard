import {
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Typography,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
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
import { Box } from "@mui/material";
export const Aside = () => {
  const navigate = useNavigate();
  const handleAlignment = () => console.log("booo");
  const asideItem = {
    display: "flex",
    justifyContent: "flex-start",
    gap: "10px",
    width: "100%",
  };

  return (
    <>
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
          <IconButton>
            <Logo />
          </IconButton>
          <Typography variant="h1">Socialwork</Typography>
        </Box>
        <ToggleButtonGroup
          orientation={"vertical"}
          sx={{ alignItems: "flex-start", width: "100%" }}
          exclusive
          onChange={handleAlignment}
        >
          <Typography variant={"h3"} color={grey[500]} sx={{ padding: "19px" }}>
            Social
          </Typography>
          <ToggleButton
            value="instagram"
            aria-label="logo"
            sx={{ width: "100%" }}
          >
            <IconButton sx={asideItem} onClick={() => navigate("/instagram")}>
              <InstagramIcon />
              <Typography>Instagram</Typography>
            </IconButton>
          </ToggleButton>
          <ToggleButton
            value="twitter"
            aria-label="logo"
            sx={{ width: "100%" }}
          >
            <IconButton sx={asideItem} onClick={() => navigate("/twitter")}>
              <XIcon />
              <Typography>Twitter</Typography>
            </IconButton>
          </ToggleButton>
          <ToggleButton
            value="facebook"
            aria-label="logo"
            sx={{ width: "100%" }}
          >
            <IconButton sx={asideItem} onClick={() => navigate("/facebook")}>
              <FacebookIcon />
              <Typography>Facebook</Typography>
            </IconButton>
          </ToggleButton>
          <ToggleButton
            value="youtube"
            aria-label="logo"
            sx={{ width: "100%" }}
          >
            <IconButton sx={asideItem} onClick={() => navigate("/youtube")}>
              <YouTubeIcon />
              <Typography>Youtube</Typography>
            </IconButton>
          </ToggleButton>
          <Typography variant={"h3"} color={grey[500]} sx={{ padding: "19px" }}>
            Menu
          </Typography>
          <ToggleButton
            value="statistic"
            aria-label="logo"
            sx={{ width: "100%" }}
          >
            <IconButton sx={asideItem} onClick={() => navigate("/statistic")}>
              <EqualizerIcon />
              <Typography>Statistics</Typography>
            </IconButton>
          </ToggleButton>
          <ToggleButton
            value="dashboard"
            aria-label="logo"
            sx={{ width: "100%" }}
          >
            <IconButton sx={asideItem} onClick={() => navigate("/dashboard")}>
              <SpaceDashboardIcon />
              <Typography>Dashboard</Typography>
            </IconButton>
          </ToggleButton>
          <ToggleButton
            value="documents"
            aria-label="logo"
            sx={{ width: "100%" }}
          >
            <IconButton sx={asideItem} onClick={() => navigate("/documents")}>
              <SourceIcon />
              <Typography>Documents</Typography>
            </IconButton>
          </ToggleButton>
          <Typography variant={"h3"} color={grey[500]} sx={{ padding: "19px" }}>
            Other
          </Typography>
          <ToggleButton
            value="settings"
            aria-label="logo"
            sx={{ width: "100%" }}
          >
            <IconButton sx={asideItem} onClick={() => navigate("/settings")}>
              <TuneIcon />
              <Typography>Settings</Typography>
            </IconButton>
          </ToggleButton>
          <ToggleButton value="logout" aria-label="logo" sx={{ width: "100%" }}>
            <IconButton sx={asideItem} onClick={() => navigate("/log")}>
              <LogoutIcon />
              <Typography>Log Out</Typography>
            </IconButton>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </>
  );
};
