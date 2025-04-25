import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "src/modules/users/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import { BcryptProvider } from "src/modules/auth/providers/bcrypt.provider";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly bcryptProvider: BcryptProvider,
  ) {}

  public async findOne(userId: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    return user;
  }

  public async findOneByUsername(username: string) {
    const user = await this.usersRepository.findOneBy({ username });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    return user;
  }

  public findAll() {
    return this.usersRepository.find();
  }

  public async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (existingUser) {
      throw new BadRequestException("User with this username already exists");
    }

    const hashedPassword = await this.bcryptProvider.hashPassword(createUserDto.password);
    const newUser = this.usersRepository.create({ ...createUserDto, password: hashedPassword });

    return this.usersRepository.save(newUser);
  }
}
