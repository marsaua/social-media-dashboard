import { WeekStatisticBox } from "@/components/InstaComponennts/WeekStatisticBox.tsx";
import { ProfileBox } from "@/components/InstaComponennts/ProfileBox.tsx";
import { GalleryBox } from "@/components/InstaComponennts/GalleryBox.tsx";
import Stack from "@mui/material/Stack";
import { AboutInsta } from "@/components/InstaComponennts/AboutInsta.tsx";
import Box from "@mui/material/Box";
import { DiagramTabs } from "@/components/InstaComponennts/DiagramTabs.tsx";
import useRefreshToken from "@/store/useRefreshToken";
import Button from "@mui/material/Button";

export const InstagramPage = () => {
  const refresh = useRefreshToken();
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
      <Button onClick={() => refresh()}>Refresh</Button>
    </Stack>
  );
};
