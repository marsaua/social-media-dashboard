import { Request, Response } from "express";
import { UploadApiResponse } from "cloudinary";
import { z } from "zod";

import cloudinary from "configs/uploadMedia.config.ts";
import User, { PUBLIC_USER_FIELDS } from "models/user.model.ts";
import { userSchema } from "schemas/user.schema.ts";

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const { username, lastName, firstName } = userSchema.update.parse(req.body);

    const user = await User.findById(userId).select(PUBLIC_USER_FIELDS);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.file) {
      try {
        const result = await new Promise<UploadApiResponse>(
          (resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "user-avatars" },
              (error, response) => {
                if (error) {
                  return reject(error);
                }

                if (!response) {
                  return reject("No response from Cloudinary");
                }

                resolve(response);
              },
            );

            stream.end(req.file?.buffer);
          },
        );

        user.avatar = result.secure_url;
      } catch (error) {
        return res.status(500).json({ error });
      }
    }

    if (username) user.username = username;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    await user.save();

    // TODO: Temp solution. The user is queried the second time to avoid responding with additional automatically set updatedAt property after saving
    const updatedUser = await User.findById(userId).select(PUBLIC_USER_FIELDS);

    res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error });
    }

    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

export default updateUser;
