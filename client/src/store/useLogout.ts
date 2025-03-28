import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const logout = () => {
    queryClient.removeQueries({ queryKey: ["authToken"] });
  };

  return { logout };
};

export const useLogoutForm = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return { handleLogout };
};
