import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./helpers";
import { useAuth } from "./useAuth";

export type CurrentUser = {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
};

export const useCurrentUser = () => {
  const { auth } = useAuth();
  return useQuery({
    queryKey: ["currentUser"],
    enabled: !!auth?.accessToken,
    retry: false,
    queryFn: async (): Promise<CurrentUser[]> => {
      const response = await fetchData(
        "/users/current",
        "GET",
        {},
        {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      );
      console.log("RESPONSE:", response);
      return response as CurrentUser[];
    },
  });
};
