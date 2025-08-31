import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Diagram } from "@/components/InstaComponennts/Diagram";

export const DiagramTabs = () => {
  const [value, setValue] = useState("Followers");
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Followers" value="Followers" />
          <Tab label="Following" value="Following" />
          <Tab label="Likes" value="Likes" />
          <Tab label="Comments" value="Comments" />
        </Tabs>
        <Box sx={{ height: "250px", width: "100%" }}>
          <Diagram value={value} />
        </Box>
      </Box>
    </Box>
  );
};
