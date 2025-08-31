import { Request, Response } from "express";
import { UploadApiResponse } from "cloudinary";
import { z } from "zod";

import Post from "models/post.model.ts";
import postSchema from "schemas/post.schema.ts";
import cloudinary from "configs/uploadMedia.config.ts";

const createPost = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const { title, description } = postSchema.create.parse(req.body);

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

    const post = new Post({
      title,
      description,
      userId,
    });

    if (imageUrl) {
      post.image = imageUrl;
    }

    await post.save();

    return res.status(201).json(post);
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

export default createPost;
