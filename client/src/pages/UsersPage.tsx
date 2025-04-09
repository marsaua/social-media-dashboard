import { Search } from "@/components/Search";
import { UserItem } from "@/components/UserItem";
import { useUsers } from "@/store/useUsers";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export const UsersPage = () => {
  const { data: users, isLoading, isError } = useUsers();
  const [value, setValue] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  const filteredUsers = users?.filter((user) => user.username.toLowerCase().includes(value));
  return (
    <Box>
      <Typography variant="h4" sx={{ paddingBottom: "30px" }}>
        Users List
      </Typography>
      <Search setValue={setValue} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(80px, 90px))",
          gap: "30px",
          justifyItems: "left",
        }}
      >
        {filteredUsers?.map((user) => <UserItem key={user._id} user={user} />)}
      </Box>
    </Box>
  );
};
