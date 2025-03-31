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
        /^(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/,
        "Password must include at least one number and one special character",
      ),
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(50, "First name must not exceed 50 characters"),
    lastName: z
      .string()
      .max(50, "Last name must not exceed 50 characters")
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
        /^(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/,
        "Password must include at least one number and one special character",
      ),
  }),

  refreshToken: z.object({
    refreshToken: z.string(),
  }),
};

export default authSchema;
