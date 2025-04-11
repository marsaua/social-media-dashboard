import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "./helpers";
import { useAuth } from "./useAuth";
import type { Post } from "./types";

export const useCreatePost = (onClose: () => void) => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return await fetchData("/posts", "POST", formData, {
        Authorization: `Bearer ${auth?.accessToken}`,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onClose();
    },
  });

  const initialValues: Post = {
    title: "",
    description: "",
    image: null,
  };

  const handleSubmit = async (values: Post) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      await mutation.mutateAsync(formData);
    } catch (err) {
      console.error("Failed to create post", err);
    }
  };

  return {
    ...mutation,
    handleSubmit,
    initialValues,
  };
};
