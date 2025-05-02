import { IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(96)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(96)
  firstName: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(96)
  lastName?: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(96)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*()\-_+=<>/]).{8,}$/, {
    message:
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
  })
  password: string;
}
