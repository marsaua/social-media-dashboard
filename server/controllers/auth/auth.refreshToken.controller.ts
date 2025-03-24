import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "models/user.model.ts";
import { ACCESS_TOKEN_EXPIRES_IN } from "configs/auth.config.ts";

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.sendStatus(401);
  }

  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) {
    return res.sendStatus(403);
  }

  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);

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
