import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigType } from "@nestjs/config";
import jwtConfig from "src/modules/auth/config/jwt.config";
import { User } from "src/modules/users/user.entity";
import { ActiveUserData } from "src/modules/auth/interfaces/active-user-data.interface";

@Injectable()
export class GenerateTokensProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async generateJwt<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        // TODO: replace deprecated sub property
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }

  public async generateSignInTokens(user: User) {
    const accessTokenPromise = this.generateJwt<Partial<ActiveUserData>>(
      user.id,
      this.jwtConfiguration.accessTokenTtl,
      {
        username: user.username,
      },
    );

    const refreshTokenPromise = this.generateJwt(user.id, this.jwtConfiguration.refreshTokenTtl);

    const [accessToken, refreshToken] = await Promise.all([accessTokenPromise, refreshTokenPromise]);

    return { accessToken, refreshToken };
  }
}
