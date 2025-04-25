import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "src/modules/auth/providers/auth.service";
import { BcryptProvider } from "./providers/bcrypt.provider";
import { UsersModule } from "src/modules/users/users.module";
import { AuthController } from "src/modules/auth/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import jwtConfig from "src/modules/auth/config/jwt.config";
import { ConfigModule } from "@nestjs/config";
import { GenerateTokensProvider } from "./providers/generate-tokens.provider";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptProvider, GenerateTokensProvider],
  exports: [AuthService, BcryptProvider],
})
export class AuthModule {}
