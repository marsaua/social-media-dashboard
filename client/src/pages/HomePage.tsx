import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

export const HomePage = () => {
  const [health, setHealth] = useState("");

  const fetchData = async () => {
    const data = await fetch("/api/health");
    const { healthStatus } = await data.json();
    console.log(healthStatus);
    setHealth(healthStatus);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Health: {health || "no health"}</p>
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
