import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";

interface AsideItemProps {
  children?: React.ReactNode;
  title: string;
  onClick: () => void;
  value: string;
}

export const AsideItem = ({ children, title, onClick, value }: AsideItemProps) => {
  const asideItem = {
    display: "flex",
    justifyContent: "flex-start",
    gap: "10px",
    width: "100%",
    textDecoration: "normal",
    border: "none",
  };
  return (
    <ToggleButton value={value} sx={{ ...asideItem }} onClick={onClick}>
      {children}
      <Typography>{title}</Typography>
    </ToggleButton>
  );
};
