import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "src/modules/users/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

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

    return this.usersRepository.save(createUserDto);
  }
}
