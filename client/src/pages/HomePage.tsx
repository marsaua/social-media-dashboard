import Box from "@mui/material/Box";

export const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Box
        sx={{
          flexGrow: 1,
          padding: "20px",
          height: "100px",
          width: "100px",
          backgroundColor: "error",
        }}
      />
    </div>
  );
};
