import { z } from "zod";

const fileSizeLimit = 3 * 1024 * 1024; // 3MB

const imageSchema = z
  .instanceof(File)
  .refine(
    (file) =>
      [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/svg+xml",
        "image/gif",
      ].includes(file.type),
    { message: "asdasdInvalid image file type" },
  )
  .refine((file) => file.size <= fileSizeLimit, {
    message: "File size should not exceed 3MB",
  })
  .optional();

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
      avatar: imageSchema,
    })
    .strict(),
};
