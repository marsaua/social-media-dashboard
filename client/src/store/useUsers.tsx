import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./helpers";
import { useAuth } from "./useAuth";
import type { User } from "./types";

export const useUsers = () => {
  const { auth } = useAuth();

  return useQuery({
    queryKey: ["users"],
    enabled: !!auth?.accessToken,
    retry: false,
    queryFn: async (): Promise<User[]> => {
      const response = await fetchData(
        "/users",
        "GET",
        {},
        {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      );
      console.log("RESPONSE:", response);
      return response as User[];
    },
  });
};
