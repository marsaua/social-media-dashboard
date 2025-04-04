import { Request, Response } from "express";

import User from "models/user.model.ts";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const users = await User.find({}, "username firstName lastName avatar").lean();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred." });
  }
};

export default getAllUsers;
