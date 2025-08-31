import { z } from "zod";

const commentSchema = {
  create: z.object({
    text: z
      .string()
      .min(1, "Text is required")
      .max(500, "Comment text cannot exceed 500 characters"),
  }),
};

export default commentSchema;
