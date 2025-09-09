import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import SearchIcon from "@mui/icons-material/Search";

type Props = {
  setValue: (val: string) => void;
};
export const Search: React.FC<Props> = ({ setValue }) => {
  return (
    <Box sx={{ paddingBottom: "60px" }}>
      <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setValue(e.target.value)}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};
