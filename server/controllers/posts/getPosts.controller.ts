import { Request, Response } from "express";

import Post from "models/post.model";

const getPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const page = req.query.page ? parseInt(req.query.page as string) : null;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : null;

    if ((page && !limit) || (!page && limit)) {
      return res.status(400).json({
        error:
          "Both 'page' and 'limit' query parameters must be provided for pagination.",
      });
    }

    if (page && page < 1) {
      return res
        .status(400)
        .json({ error: "'Page' must be a positive number." });
    }

    if (limit && limit < 1) {
      return res
        .status(400)
        .json({ error: "'Limit' must be a positive number." });
    }

    if (page && limit) {
      const skip = (page - 1) * limit;

      const posts = await Post.find({ userId })
        .sort("-createdAt")
        .skip(skip)
        .limit(limit);

      const totalPosts = await Post.countDocuments({ userId });

      return res.status(200).json({
        posts,
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts,
      });
    }

    const posts = await Post.find({ userId }).sort("-createdAt");
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

export default getPosts;
