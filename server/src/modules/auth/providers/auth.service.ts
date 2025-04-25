import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/modules/users/providers/users.service";
import { SignInDto } from "src/modules/dto/sign-in.dto";
import { BcryptProvider } from "src/modules/auth/providers/bcrypt.provider";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly bcryptProvider: BcryptProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOneByUsername(signInDto.username);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const passwordsMatch = await this.bcryptProvider.comparePasswords(signInDto.password, user.password);
    if (!passwordsMatch) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return user;
  }
}
