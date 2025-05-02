import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

export enum CloudinaryFolder {
  POST_IMAGES = "post-images",
  USER_AVATARS = "user-avatars",
}

@Injectable()
export class UploadToCloudinaryProvider {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get("cloudinary.cloud_name"),
      api_key: this.configService.get("cloudinary.api_key"),
      api_secret: this.configService.get("cloudinary.api_secret"),
    });
  }

  public async upload(file: Express.Multer.File, folder: CloudinaryFolder) {
    try {
      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder }, (error, response) => {
          if (error)
            return reject(new ServiceUnavailableException("Error uploading image to Cloudinary: " + error.message));

          if (!response) return reject(new BadGatewayException("No response from Cloudinary", error));

          resolve(response);
        });

        stream.end(file?.buffer);
      });

      return result.secure_url;
    } catch (error) {
      throw new InternalServerErrorException("Error uploading image.", error);
    }
  }
}
