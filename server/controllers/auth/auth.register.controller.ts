import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { authSchema } from "schemas/auth.schema.ts";
import User from "models/user.model.ts";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  refreshTokenCookieOptions,
} from "configs/auth.config.ts";

export const register = async (req: Request, res: Response) => {
  try {
    const parsedPayload = authSchema.register.parse(req.body);

    const userExists = await User.findOne({ username: parsedPayload.username });
    if (userExists) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(parsedPayload.password, 10);

    const newUser = await User.create({
      ...parsedPayload,
      password: hashedPassword,
    });

    const accessToken = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
    );
    const refreshToken = jwt.sign(
      { id: newUser._id },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN },
    );

    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.cookie("refresh_token", refreshToken, refreshTokenCookieOptions);

    return res.status(201).json({ accessToken });
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
