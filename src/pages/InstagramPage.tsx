import { WeekStatisticBox } from "../components/InstaComponennts/WeekStatisticBox";
import { ProfileBox } from "../components/InstaComponennts/ProfileBox";
import { GalleryBox } from "../components/InstaComponennts/GalleryBox";
import { Stack } from "@mui/material";
import { AboutInsta } from "../components/InstaComponennts/AboutInsta";

export const InstagramPage = () => {
  return (
    <Stack direction="column" spacing={3}>
      <h1>Instagram Page</h1>
      <WeekStatisticBox />
      <ProfileBox />
      <GalleryBox />
      <AboutInsta />
    </Stack>
  );
};
