import { Request, Response } from "express";

import Post from "models/post.model";

const getPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId).lean();

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
};

export default getPost;
