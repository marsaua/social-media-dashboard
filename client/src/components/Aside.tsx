import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
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
import { Logo } from "./Logo";
import { LogoutModal } from "./Modals/LogoutModal";
import { AsideItem } from "./AsideItem";

export const Aside = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleAlignment = (_: React.MouseEvent<HTMLElement>, newValue: string | undefined) => {
    setSelected(newValue);
  };

  useEffect(() => {
    if (location) {
      setSelected(location.pathname.slice(1));
    }
  }, [location]);

  const handleLogout = () => {
    setOpen(true);
  };

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
          Main
        </Typography>
        <AsideItem value="instagram" title="Instagram" onClick={() => navigate("/instagram")}>
          <InstagramIcon />
        </AsideItem>
        <AsideItem value="twitter" title="Twitter" onClick={() => navigate("/twitter")}>
          <XIcon />
        </AsideItem>
        <AsideItem value="facebook" title="Facebook" onClick={() => navigate("/facebook")}>
          <FacebookIcon />
        </AsideItem>
        <AsideItem value="youtube" title="Youtube" onClick={() => navigate("/youtube")}>
          <YouTubeIcon />
        </AsideItem>

        <Typography variant={"h3"} color={grey[500]} sx={{ padding: "19px" }}>
          Menu
        </Typography>
        <AsideItem value="statistic" title="Statistics" onClick={() => navigate("/statistic")}>
          <EqualizerIcon />
        </AsideItem>
        <AsideItem value="dashboard" title="Dashboard" onClick={() => navigate("/dashboard")}>
          <SpaceDashboardIcon />
        </AsideItem>
        <AsideItem value="documents" title="Documents" onClick={() => navigate("/documents")}>
          <SourceIcon />
        </AsideItem>

        <Typography variant={"h3"} color={grey[500]} sx={{ padding: "19px" }}>
          Other
        </Typography>
        <AsideItem value="settings" title="Settings" onClick={() => navigate("/settings")}>
          <TuneIcon />
        </AsideItem>
        <AsideItem value="logout" title="Log Out" onClick={handleLogout}>
          <LogoutIcon />
        </AsideItem>
      </ToggleButtonGroup>
      {open && <LogoutModal open={open} onClose={() => setOpen(false)} />}
    </Box>
  );
};
