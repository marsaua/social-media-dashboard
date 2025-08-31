import { Request, Response } from "express";

import User from "models/user.model.ts";
import { refreshTokenCookieOptions } from "configs/auth.config.ts";

export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return res.status(204).json({ message: "No refresh token present." });
  }

  try {
    const foundUser = await User.findOne({ refreshToken });

    if (foundUser) {
      foundUser.refreshToken = null;
      await foundUser.save();
    }

    res.clearCookie("refresh_token", {
      ...refreshTokenCookieOptions,
    });

    return res.status(204).json({ message: "Logged out successfully." });
  } catch (err) {
    return res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
