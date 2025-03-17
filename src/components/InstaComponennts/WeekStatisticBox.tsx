import Box from "@mui/material/Box";
import { weekStatisticData } from "../../store/useWeekStatistic";
import { WeekSatisticCard } from "./WeekStatisticCard";

export const WeekStatisticBox = () => {
  return (
    <Box sx={{ display: "flex", gap: "10px", justifyContent: "space-between" }}>
      {weekStatisticData.map((card, index) => (
        <WeekSatisticCard card={card} key={index} />
      ))}
    </Box>
  );
};
