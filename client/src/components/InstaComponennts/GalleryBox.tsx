import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export const GalleryBox = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Box
          component="img"
          src="./11.jpg"
          sx={{
            objectFit: "cover",
            width: "100%",
            height: "auto",
            borderRadius: "10px",
          }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box
          component="img"
          src="./7.jpg"
          sx={{
            objectFit: "cover",
            width: "100%",
            height: "auto",
            borderRadius: "10px",
          }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Grid container spacing={1}>
          {["4.jpg", "9.jpg", "10.jpg", "2.jpg"].map((src, index) => (
            <Grid item xs={6} key={index}>
              <Box
                component="img"
                src={`./${src}`}
                sx={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
