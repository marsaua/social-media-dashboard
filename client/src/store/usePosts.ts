import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./helpers";
import { useAuth } from "./useAuth";
import { useCurrentUser } from "./useCurrentUser";

export type Post = {
  description: string;
  title: string;
  image: File;
};

export const usePosts = () => {
  const { auth } = useAuth();
  const { data: user } = useCurrentUser();
  const id = user?._id;
  console.log(user?._id);

  return useQuery({
    queryKey: ["posts"],
    enabled: !!auth?.accessToken && !!id,
    retry: false,
    queryFn: async (): Promise<Post[]> => {
      const response = await fetchData(
        `/posts/user/${id}`,
        "GET",
        {},
        { Authorization: `Bearer ${auth?.accessToken}` },
      );
      return response as Post[];
    },
  });
};
