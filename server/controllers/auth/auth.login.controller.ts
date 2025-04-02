import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import authSchema from "schemas/auth.schema.ts";
import User from "models/user.model.ts";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  refreshTokenCookieOptions,
} from "configs/auth.config.ts";

export const login = async (req: Request, res: Response) => {
  try {
    const parsedPayload = authSchema.login.parse(req.body);

    const foundUser = await User.findOne({ username: parsedPayload.username });
    if (!foundUser) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const passwordMatch = await bcrypt.compare(
      parsedPayload.password,
      foundUser.password,
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const accessToken = jwt.sign(
      { id: foundUser._id, username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      },
    );
    const refreshToken = jwt.sign(
      { id: foundUser._id },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN },
    );

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie("refresh_token", refreshToken, refreshTokenCookieOptions);

    return res.status(200).json({ accessToken });
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
