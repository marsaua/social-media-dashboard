import { Request, Response } from "express";
import { z } from "zod";

import Post from "models/post.model";
import postSchema from "schemas/post.schema";
import { UploadApiResponse } from "cloudinary";
import cloudinary from "configs/uploadMedia.config.ts";

const updatePost = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { postId } = req.params;

    const { title, description } = postSchema.create.partial().parse(req.body);

    let imageUrl: string | null = null;

    if (req.file) {
      try {
        const result = await new Promise<UploadApiResponse>(
          (resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "post-images" },
              (error, response) => {
                if (error) return reject(error);

                if (!response) return reject("No response from Cloudinary");

                resolve(response);
              },
            );

            stream.end(req.file?.buffer);
          },
        );

        imageUrl = result.secure_url;
      } catch (error) {
        return res.status(500).json({ message: "Error uploading image." });
      }
    }

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

    if (title) post.title = title;
    if (description) post.description = description;
    if (imageUrl) post.image = imageUrl;

    await post.save();

    res.status(200).json(post);
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

export default updatePost;
