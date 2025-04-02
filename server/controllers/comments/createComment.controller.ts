import { Request, Response } from "express";

import Comment from "models/comment.model.ts";
import Post from "models/post.model.ts";
import commentSchema from "schemas/comment.schema.ts";
import { z } from "zod";

const createComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { text } = commentSchema.create.parse(req.body);

    if (!postId || !text) {
      return res
        .status(400)
        .json({ message: "Post ID and comment text are required." });
    }

    const newComment = await Comment.create({
      postId,
      text,
      userId: req.user?.id,
    });

    await Post.findByIdAndUpdate(postId, { $inc: { totalComments: 1 } });

    return res.status(201).json(newComment);
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

export default createComment;
