import { Request, Response } from "express";
import mongoose from "mongoose";

import Comment from "models/comment.model.ts";
import Post from "models/post.model.ts";

const deleteComment = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { postId, commentId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "Invalid comment ID." });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    if (comment.userId.toString() !== userId) {
      return res
        .status(403)
        .json({
          message: "You do not have permission to delete this comment.",
        });
    }

    await Comment.findByIdAndDelete(commentId);

    await Post.findByIdAndUpdate(postId, { $inc: { totalComments: -1 } });

    return res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred." });
  }
};

export default deleteComment;
