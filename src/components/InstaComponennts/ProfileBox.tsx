import { Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import { Box } from "@mui/material";

export const ProfileBox = () => {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "350px",
        gap: "15px",
        borderRadius: "10px",
        padding: "10px 20px",
        border: `1px solid ${theme.palette.text.secondary}`,
      })}
    >
      <Avatar
        src="./6.jpg"
        alt="user avatar"
        sx={{ height: "100px", width: "100px" }}
      />
      <Typography variant="h4">Kitty Cat</Typography>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Typography>Post</Typography>
          <Typography variant="h5">498</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Typography>Followers</Typography>
          <Typography variant="h5">12,495M</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Typography>Following</Typography>
          <Typography variant="h5">358</Typography>
        </Box>
      </Box>
    </Box>
  );
};
