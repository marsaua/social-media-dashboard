import { Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

import User from "models/user.model.ts";
import { ACCESS_TOKEN_EXPIRES_IN } from "configs/auth.config.ts";

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refresh_token;
    if (!token) {
      return res.status(401).json({ message: "Refresh token is missing." });
    }

    const foundUser = await User.findOne({ refreshToken: token });
    if (!foundUser) {
      return res.status(403).json({ message: "Invalid refresh token or user not found." });
    }

    try {
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      return res.status(403).json({ message: "Refresh token is invalid or expired." });
    }

    const newAccessToken = jwt.sign(
      { id: foundUser._id, username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
    );

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(500).json({ message: "An unexpected error occurred." });
  }
};
