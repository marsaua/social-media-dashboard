import { useQuery } from "@tanstack/react-query";
import type { Post } from "./types";
import { fetchData } from "./helpers";
import { useAuth } from "./useAuth";

export const useSinglePost = (postId: string) => {
  const { auth } = useAuth();
  const fetchPost = async (): Promise<Post> => {
    const response = await fetchData(
      `/posts/${postId}`,
      "GET",
      {},
      {
        Authorization: `Bearer ${auth?.accessToken}`,
      },
    );
    console.log("RESPONSE:", response);
    return response as Post;
  };
  return useQuery({
    queryKey: ["singlePost"],
    retry: false,
    queryFn: fetchPost,
  });
};
