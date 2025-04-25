import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "src/modules/auth/providers/auth.service";
import { SignInDto } from "src/modules/dto/sign-in.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-in")
  public signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
