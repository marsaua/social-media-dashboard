import { z } from "zod";

export const userSchema = {
  update: z
    .object({
      username: z
        .string()
        .min(4, "Username must be at least 4 characters long")
        .max(20, "Username must not exceed 20 characters")
        .regex(
          /^[a-zA-Z0-9_]+$/,
          "Username can only contain letters, numbers, and underscores",
        )
        .optional(),
      firstName: z
        .string()
        .min(1, "First name is required")
        .max(50, "First name must not exceed 50 characters")
        .optional(),
      lastName: z
        .string()
        .max(50, "Last name must not exceed 50 characters")
        .optional(),
      avatar: z.any().optional(),
    })
    .strict(),
};
