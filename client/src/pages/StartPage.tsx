import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Logo } from "@/components/Logo";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export const StartPage = () => {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/start/signup");
  };
  return (
    <Box sx={{ position: "relative" }}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={2}
        sx={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Logo />
        <Typography variant="h1">Socialwork</Typography>
      </Stack>
      <Box
        sx={{
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Stack
          direction="column"
          gap={4}
          sx={{ justifyContent: "center", maxWidth: "300px", width: "100%" }}
        >
          <Button variant="outlined">Sign In</Button>
          <Button variant="outlined" onClick={handleSignUp}>
            Sign Up
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
