import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "./helpers";
import { useAuth } from "./useAuth";
import type { Post } from "./types";

export const useDeletePost = (onClose: () => void, post: Post) => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const id = post._id;
      return await fetchData(
        `/posts/${id}`,
        "DELETE",
        {},
        {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onClose();
    },
  });

  const handleSubmit = async () => {
    try {
      await mutation.mutateAsync();
      onClose();
    } catch (err) {
      console.error("Failed to create post", err);
    }
  };

  return {
    ...mutation,
    handleSubmit,
  };
};
