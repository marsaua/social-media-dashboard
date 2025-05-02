import { Module } from "@nestjs/common";
import { UploadToCloudinaryProvider } from "src/modules/uploads/providers/upload-to-cloudinary.provider";

@Module({
  providers: [UploadToCloudinaryProvider],
  exports: [UploadToCloudinaryProvider],
})
export class UploadsModule {}
