import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "./helpers";
import { useAuth } from "./useAuth";

export const useEditPost = (onClose: () => void, post) => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const id = post._id;
      return await fetchData(`/posts/${id}`, "PATCH", formData, {
        Authorization: `Bearer ${auth?.accessToken}`,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onClose();
    },
  });

  const handleSubmit = async (values: Post) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      await mutation.mutateAsync(formData);
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
