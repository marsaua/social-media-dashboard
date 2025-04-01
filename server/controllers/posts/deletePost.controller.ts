import { Request, Response } from "express";

import Post from "models/post.model";

const deletePost = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { postId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (post.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action." });
    }

    await Post.findByIdAndDelete(postId);

    return res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred." });
  }
};

export default deletePost;
