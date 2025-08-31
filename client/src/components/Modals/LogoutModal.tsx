import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useLogout } from "@/store/useLogout";

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
}

export const LogoutModal = ({ open, onClose }: LogoutModalProps) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout();
  };
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure you want to logout?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          You will be logged out of your account.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
          <Button onClick={onClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary" variant="contained">
            Logout
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
