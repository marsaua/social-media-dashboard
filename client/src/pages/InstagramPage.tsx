import { WeekStatisticBox } from "@/components/InstaComponennts/WeekStatisticBox.tsx";
import { ProfileBox } from "@/components/InstaComponennts/ProfileBox.tsx";
import { GalleryBox } from "@/components/InstaComponennts/GalleryBox.tsx";
import Stack from "@mui/material/Stack";
import { AboutInsta } from "@/components/InstaComponennts/AboutInsta.tsx";
import { Diagram } from "@/components/InstaComponennts/Diagram.tsx";
import Box from "@mui/material/Box";
import { DiagramTabs } from "@/components/InstaComponennts/DiagramTabs.tsx";

export const InstagramPage = () => {
  return (
    <Stack direction="column" spacing={3} sx={{ width: "100%" }}>
      <h1>Instagram Page</h1>
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
