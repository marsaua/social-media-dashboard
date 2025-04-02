import { z } from "zod";

const authSchema = {
  register: z.object({
    username: z
      .string()
      .min(4, "Username must be at least 4 characters long")
      .max(20, "Username must not exceed 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(64, "Password must not exceed 64 characters")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*()\-_+=<>/]).{8,}$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
      )
      .refine(
        (password) => !/(.)\1\1/.test(password),
        "Password must not contain three or more repeated characters",
      ),
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(50, "First name must not exceed 50 characters")
      .regex(
        /^[a-zA-ZÀ-ÿ' -]+$/,
        "First name can only contain alphabetic characters, spaces, hyphens, or apostrophes",
      )
      .trim(),
    lastName: z
      .string()
      .max(50, "First name must not exceed 50 characters")
      .regex(
        /^[a-zA-ZÀ-ÿ' -]+$/,
        "Last name can only contain alphabetic characters, spaces, hyphens, or apostrophes",
      )
      .trim()
      .optional(),
  }),

  login: z.object({
    username: z
      .string()
      .min(4, "Username must be at least 4 characters long")
      .max(20, "Username must not exceed 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(64, "Password must not exceed 64 characters")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*()\-_+=<>/]).{8,}$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
  }),
};

export default authSchema;
