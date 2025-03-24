import { WeekStatisticBox } from "../components/InstaComponennts/WeekStatisticBox";
import { ProfileBox } from "../components/InstaComponennts/ProfileBox";
import { GalleryBox } from "../components/InstaComponennts/GalleryBox";
import Stack from "@mui/material/Stack";
import { AboutInsta } from "../components/InstaComponennts/AboutInsta";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { DiagramTabs } from "../components/InstaComponennts/DiagramTabs";

export const InstagramPage = () => {
  return (
    <Stack direction="column" spacing={3} sx={{ width: "100%" }}>
      <Typography variant="h1">Instagram Page</Typography>
      <WeekStatisticBox />
      <Stack spacing={2} direction={"row"}>
        <ProfileBox />
        <Box sx={{ height: "300px", width: "100%" }}>
          <DiagramTabs />
        </Box>
      </Stack>
      <GalleryBox />
      <AboutInsta />
    </Stack>
  );
};
