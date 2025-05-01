import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePostDto {
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  description: string;
}
