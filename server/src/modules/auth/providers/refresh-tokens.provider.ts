import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from "express";
import { refreshTokenCookieName, refreshTokenCookieOptions } from "src/modules/auth/config/refresh-token-cookie.config";
import { UsersService } from "src/modules/users/providers/users.service";
import { GenerateTokensProvider } from "src/modules/auth/providers/generate-tokens.provider";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "src/modules/auth/config/jwt.config";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class RefreshTokensProvider {
  constructor(
    private readonly usersService: UsersService,
    private readonly generateTokensProvider: GenerateTokensProvider,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async refreshTokens(request: Request, response: Response) {
    const refreshToken = this.extractRefreshTokenFromCookies(request);

    if (!refreshToken) {
      throw new UnauthorizedException("Invalid refresh token. Please sign in again.");
    }

    const user = await this.usersService.findOneByRefreshToken(refreshToken);
    if (!user) {
      throw new UnauthorizedException("Invalid refresh token. Please sign in again.");
    }

    try {
      await this.jwtService.verifyAsync(refreshToken, this.jwtConfiguration);
    } catch (error) {
      throw new UnauthorizedException("Invalid refresh token. Please sign in again.");
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await this.generateTokensProvider.generateSignInTokens(user);

    await this.usersService.updateOne(user.id, { refreshToken });
    response.cookie(refreshTokenCookieName, newRefreshToken, refreshTokenCookieOptions);
    return { accessToken: newAccessToken };
  }

  private extractRefreshTokenFromCookies = (req: Request) => {
    const cookies = req.headers.cookie?.split("; ");
    if (!cookies?.length) {
      return null;
    }

    const refreshTokenCookie = cookies.find((cookie) => cookie.startsWith(refreshTokenCookieName + "="));

    if (!refreshTokenCookie) {
      return null;
    }

    const refreshTokenCookieValue = refreshTokenCookie.split("=")[1];
    return refreshTokenCookieValue;
  };
}
