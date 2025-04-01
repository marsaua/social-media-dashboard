import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/store/useAuth";
import { fetchData } from "@/store/helpers";
import { useCallback } from "react";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const logout = useCallback(async () => {
    try {
      await fetchData("/auth/logout", "POST", undefined, {}, true);
    } catch (e) {
      console.error("Logout failed on server:", e);
    } finally {
      setAuth(null);
      queryClient.removeQueries({ queryKey: ["authToken"] });
      navigate("/start/login");
    }
  }, [queryClient, navigate, setAuth]);

  return { logout };
};
