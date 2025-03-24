import Box from "@mui/material/Box";
import { WeekSatisticCard } from "./WeekStatisticCard";

const weekStatisticData = [
  {
    icon: "/icons/follower.png",
    amount: 2348,
    name: "Weekly Followers",
  },
  {
    icon: "/icons/follower.png",
    amount: 3232,
    name: "Weekly Following",
  },
  {
    icon: "/icons/follower.png",
    amount: 36789,
    name: "Weekly Likes",
  },
  {
    icon: "/icons/follower.png",
    amount: 8358,
    name: "Weekly Comments",
  },
];
export const WeekStatisticBox = () => {
  return (
    <Box sx={{ display: "flex", gap: "10px", justifyContent: "space-between" }}>
      {weekStatisticData.map((card, index) => (
        <WeekSatisticCard card={card} key={index} />
      ))}
    </Box>
  );
};
