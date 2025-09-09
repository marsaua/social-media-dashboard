import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./helpers";
import { useAuth } from "./useAuth";
import type { User } from "./types";

export const useCurrentUser = () => {
  const { auth } = useAuth();
  const fetchUser = async (): Promise<User> => {
    const response = await fetchData(
      "/users/current",
      "GET",
      {},
      {
        Authorization: `Bearer ${auth?.accessToken}`,
      },
    );
    console.log("RESPONSE:", response);
    return response as User;
  };
  return useQuery({
    queryKey: ["currentUser"],
    enabled: !!auth?.accessToken,
    retry: false,
    queryFn: fetchUser,
  });
};
