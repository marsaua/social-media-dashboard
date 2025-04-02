import { Request, Response } from "express";
import Comment from "models/comment.model.ts";

const getComments = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required." });
    }

    const comments = await Comment.find({ postId }).sort("-createdAt").lean();

    return res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred." });
  }
};

export default getComments;
