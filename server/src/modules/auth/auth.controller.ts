import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "src/modules/auth/providers/auth.service";
import { SignInDto } from "src/modules/auth/dto/sign-in.dto";
import { PublicEndpoint } from "src/modules/auth/decorators/public-endpoint.decorator";
import { Request, Response } from "express";

@PublicEndpoint()
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  public signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) response: Response) {
    return this.authService.signIn(signInDto, response);
  }

  @Post("refresh-tokens")
  @HttpCode(HttpStatus.OK)
  public refreshTokens(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    return this.authService.refreshTokens(request, response);
  }
}
