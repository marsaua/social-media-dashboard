import { NotFoundException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "src/modules/users/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import { BcryptProvider } from "src/modules/auth/providers/bcrypt.provider";
import { ActiveUserData } from "src/modules/auth/interfaces/active-user-data.interface";
import { UpdateUserDto } from "src/modules/users/dto/update-user.dto";
import {
  CloudinaryFolder,
  UploadToCloudinaryProvider,
} from "src/modules/uploads/providers/upload-to-cloudinary.provider";
import { instanceToPlain } from "class-transformer";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly bcryptProvider: BcryptProvider,
    private readonly uploadToCloudinaryProvider: UploadToCloudinaryProvider,
  ) {}

  public async findUser(userId: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  public async getCurrentUser(userId: ActiveUserData["sub"]) {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  public async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto & {
      refreshToken?: User["refreshToken"];
    },
    uploadedFile?: Express.Multer.File,
  ) {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    let avatarUrl: string | null = null;
    if (uploadedFile) {
      avatarUrl = await this.uploadToCloudinaryProvider.upload(uploadedFile, CloudinaryFolder.USER_AVATARS);
    }

    const updatedUser = this.usersRepository.create({ ...user, ...updateUserDto, avatarUrl });

    return await this.usersRepository.save(updatedUser);
  }

  public async findUserByUsername(username: string) {
    const user = await this.usersRepository.findOneBy({ username });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  public async findUserByRefreshToken(refreshToken: string) {
    const user = await this.usersRepository.findOneBy({ refreshToken });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  public findAllUsers() {
    return this.usersRepository.find();
  }

  public async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (existingUser) {
      throw new NotFoundException("User with this username already exists");
    }

    const hashedPassword = await this.bcryptProvider.hashPassword(createUserDto.password);
    const newUser = this.usersRepository.create({ ...createUserDto, password: hashedPassword });

    return this.usersRepository.save(newUser);
  }
}
