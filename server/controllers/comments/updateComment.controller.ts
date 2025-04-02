import { Request, Response } from "express";

import Comment from "models/comment.model.ts";
import commentSchema from "schemas/comment.schema.ts";
import { z } from "zod";
import mongoose from "mongoose";

const updateComment = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { commentId } = req.params;
    const { text } = commentSchema.create.parse(req.body);

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "Invalid comment ID." });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    if (comment.userId.toString() !== userId) {
      return res.status(403).json({
        message: "You do not have permission to update this comment.",
      });
    }

    comment.text = text;
    await comment.save();

    return res.status(200).json(comment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: error.flatten().fieldErrors,
      });
    }

    res.status(500).json({ message: "An unexpected error occurred." });
  }
};

export default updateComment;
