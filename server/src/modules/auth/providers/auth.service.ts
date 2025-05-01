import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/modules/users/providers/users.service";
import { SignInDto } from "src/modules/auth/dto/sign-in.dto";
import { BcryptProvider } from "src/modules/auth/providers/bcrypt.provider";
import { GenerateTokensProvider } from "src/modules/auth/providers/generate-tokens.provider";
import { Request, Response } from "express";
import { refreshTokenCookieName, refreshTokenCookieOptions } from "src/modules/auth/config/refresh-token-cookie.config";
import { RefreshTokensProvider } from "src/modules/auth/providers/refresh-tokens.provider";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly bcryptProvider: BcryptProvider,
    private readonly generateTokensProvider: GenerateTokensProvider,
    private readonly refreshTokensProvider: RefreshTokensProvider,
  ) {}

  public async signIn(signInDto: SignInDto, response: Response) {
    const user = await this.usersService.findUserByUsername(signInDto.username);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const passwordsMatch = await this.bcryptProvider.comparePasswords(signInDto.password, user.password);
    if (!passwordsMatch) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const { accessToken, refreshToken } = await this.generateTokensProvider.generateSignInTokens(user);
    await this.usersService.updateUser(user.id, { refreshToken });
    response.cookie(refreshTokenCookieName, refreshToken, refreshTokenCookieOptions);
    return { accessToken };
  }

  public async signOut(request: Request, response: Response) {
    const refreshToken = request.cookies?.[refreshTokenCookieName];

    if (!refreshToken) {
      response.clearCookie(refreshTokenCookieName, refreshTokenCookieOptions);
      return { message: "No refresh token found. Signed out successfully" };
    }

    const user = await this.usersService.findUserByRefreshToken(refreshToken);
    await this.usersService.updateUser(user.id, { refreshToken: null });

    response.clearCookie(refreshTokenCookieName, refreshTokenCookieOptions);

    return { message: "Signed out successfully" };
  }

  public refreshTokens(request: Request, response: Response) {
    return this.refreshTokensProvider.refreshTokens(request, response);
  }
}
