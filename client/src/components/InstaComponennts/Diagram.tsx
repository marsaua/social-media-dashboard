import { ResponsiveBar } from "@nivo/bar";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

const data = [
  {
    month: "Jan",
    Followers: 86,
    Following: 1,
    Likes: 200,
    Comments: 76,
  },
  {
    month: "Feb",
    Followers: 86,
    Following: 2,
    Likes: 230,
    Comments: 65,
  },
  {
    month: "Mar",
    Followers: 61,
    Following: 7,
    Likes: 340,
    Comments: 44,
  },
  {
    month: "Apr",
    Followers: 175,
    Following: 6,
    Likes: 320,
    Comments: 22,
  },
  {
    month: "May",
    Followers: 86,
    Following: 5,
    Likes: 230,
    Comments: 54,
  },
  {
    month: "Jun",
    Followers: 85,
    Following: 6,
    Likes: 150,
    Comments: 43,
  },
  {
    month: "Jul",
    Followers: 112,
    Following: 7,
    Likes: 340,
    Comments: 56,
  },
  {
    month: "Aug",
    Followers: 12,
    Following: 2,
    Likes: 400,
    Comments: 84,
  },
  {
    month: "Sep",
    Followers: 112,
    Following: 5,
    Likes: 100,
    Comments: 56,
  },
  {
    month: "Oct",
    Followers: 112,
    Following: 3,
    Likes: 318,
    Comments: 32,
  },
  {
    month: "Nov",
    Followers: 112,
    Following: 9,
    Likes: 210,
    Comments: 34,
  },
  {
    month: "Dec",
    Followers: 112,
    Following: 2,
    Likes: 100,
    Comments: 12,
  },
];

type Props = {
  value: string;
};
export const Diagram: React.FC<Props> = ({ value }) => {
  const [selectedBar, setSelectedBar] = useState<string | null>("Apr");
  const theme = useTheme();
  const handleChange = (bar) => {
    setSelectedBar(bar.indexValue);
  };
  return (
    <ResponsiveBar
      data={data}
      keys={[value]}
      indexBy="month"
      groupMode="grouped"
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      padding={0.25}
      layout="vertical"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      borderRadius={4}
      axisTop={null}
      axisRight={null}
      animate={true}
      tooltip={() => null}
      colors={(bar) =>
        bar.indexValue === selectedBar
          ? theme.palette.primary.main
          : theme.palette.text.secondary
      }
      fill={[
        {
          match: { indexValue: selectedBar },
          id: "selectedPattern",
        },
      ]}
      label={(d) => (selectedBar === d.indexValue ? d.value : "")}
      labelTextColor={theme.palette.primary.main}
      labelOffset={16}
      labelPosition="end"
      labelSkipHeight={0}
      onClick={handleChange}
      motionConfig={{
        mass: 9,
        tension: 260,
        friction: 60,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickValues: 0,
      }}
      gridYValues={5}
      theme={{
        labels: {
          text: {
            fontSize: 16,
          },
        },
        grid: {
          line: {
            stroke: theme.palette.text.secondary,
            strokeWidth: 1,
          },
        },
        axis: {
          domain: {
            line: {
              stroke: theme.palette.text.secondary,
            },
          },
          ticks: {
            text: {
              fill: "#ffffff",
              fontSize: 14,
            },
          },
        },
      }}
      role="application"
      ariaLabel="Statistic"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in month: " + e.indexValue
      }
    />
  );
};
