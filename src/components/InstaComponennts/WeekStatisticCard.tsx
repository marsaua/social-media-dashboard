import { Card, Box, Typography } from "@mui/material";
import { formatAmount } from "../../store/helpers";

export const WeekSatisticCard = ({ card }) => {
  const { icon, amount, name } = card;
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        gap: "10px",
        padding: "10px",
        borderRadius: "10px",
        width: "100%",
        maxWidth: "350px",
      }}
    >
      <Box
        sx={(theme) => ({
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.background.light_grey,
          borderRadius: "100%",
        })}
      >
        <Box component="img" src={icon} sx={{ height: "50px" }}></Box>
      </Box>
      <Box>
        <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
          {formatAmount(amount)}
        </Typography>
        <Typography>{name}</Typography>
      </Box>
    </Card>
  );
};
