import { Request, Response } from "express";

import User, { PUBLIC_USER_FIELDS } from "models/user.model.ts";

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(userId).select(PUBLIC_USER_FIELDS);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user data:", error.message);
      res.status(500).json({ error: "Failed to fetch user data" });
    }
  }
};

export default getCurrentUser;
