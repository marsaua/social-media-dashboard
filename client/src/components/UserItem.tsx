import type { User } from "@/store/types";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

type Props = {
  user: User;
};
export const UserItem: React.FC<Props> = ({ user }) => {
  return (
    <Stack spacing={1} direction="column" sx={{ justifyContent: "center", alignItems: "center" }}>
      <Avatar src={user.avatar} sx={{ width: 70, height: 70 }}></Avatar>
      <Typography sx={{ fontSize: "12px" }}>{user.username}</Typography>
    </Stack>
  );
};
