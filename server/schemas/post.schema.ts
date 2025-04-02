import { z } from "zod";

const postSchema = {
  create: z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(100, "Title cannot exceed 100 characters"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(500, "Description cannot exceed 500 characters"),
  }),
  image: z.any().optional(),
};

export default postSchema;
