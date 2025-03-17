

import Stack  from "@mui/material/Stack";
import Box from "@mui/material/Box";

export const GalleryBox = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ width: "100%", justifyContent: "space-between" }}
    >
      <Box>
        <Box
          component="img"
          src="./11.jpg"
          sx={{
            objectFit: "cover",
            width: "auto",
            height: "300px",
            borderRadius: "10px",
          }}
        />
      </Box>
      <Box>
        <Box
          component="img"
          src="./7.jpg"
          sx={{
            objectFit: "cover",
            width: "auto",
            height: "300px",
            borderRadius: "10px",
          }}
        />
      </Box>
      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5px",
          borderRadius: "10px",
        }}
      >
        <Box
          component="img"
          src="./4.jpg"
          sx={{
            objectFit: "cover",
            width: "auto",
            height: "150px",
            borderRadius: "10px",
          }}
        />
        <Box
          component="img"
          src="./9.jpg"
          sx={{
            objectFit: "cover",
            width: "auto",
            height: "150px",
            borderRadius: "10px",
          }}
        />
        <Box
          component="img"
          src="./10.jpg"
          sx={{
            objectFit: "cover",
            width: "auto",
            height: "150px",
            borderRadius: "10px",
          }}
        />
        <Box
          component="img"
          src="./2.jpg"
          sx={{
            objectFit: "cover",
            width: "auto",
            height: "150px",
            borderRadius: "10px",
          }}
        />
      </Stack>
    </Stack>
  );
};
