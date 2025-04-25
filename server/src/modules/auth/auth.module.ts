import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "src/modules/auth/providers/auth.service";
import { BcryptProvider } from "./providers/bcrypt.provider";
import { UsersModule } from "src/modules/users/users.module";
import { AuthController } from "src/modules/auth/auth.controller";

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [AuthController],
  providers: [AuthService, BcryptProvider],
  exports: [AuthService, BcryptProvider],
})
export class AuthModule {}
