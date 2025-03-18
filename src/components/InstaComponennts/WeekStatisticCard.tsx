import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { formatAmount } from "../../store/helpers";
import { StatisticCardT } from "../../helpers/types";

type Props= {card: StatisticCardT}

export const WeekSatisticCard:React.FC<Props> = ({ card }) => {
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
        sx={() => ({
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
