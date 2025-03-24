import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";

import { authSchema } from "schemas/auth.schema.ts";
import User from "models/user.model.ts";

export const register = async (req: Request, res: Response) => {
  try {
    const parsedPayload = authSchema.register.parse(req.body);

    const userExists = await User.findOne({ username: parsedPayload.username });
    if (userExists) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(parsedPayload.password, 10);

    await User.create({
      ...parsedPayload,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: error.flatten().fieldErrors,
      });
    }

    return res.status(500).json({ message: "An unexpected error occurred." });
  }
};
