import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import cloudinaryConfig from "src/modules/uploads/config/cloudinary.config";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import appConfig, { ENV } from "src/config/app.config";
import dbConfig from "src/config/db.config";
import environmentValidation from "src/config/environment.validation";
import jwtConfig from "src/modules/auth/config/jwt.config";
import mailConfig from "src/modules/mail/config/mail.config";
import { JwtModule } from "@nestjs/jwt";
import { PostsModule } from "./modules/posts/posts.module";
import { UploadsModule } from "./modules/uploads/uploads.module";
import { CommentsModule } from "src/modules/comments/comments.module";
import { MailModule } from "src/modules/mail/mail.module";

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PostsModule,
    UploadsModule,
    CommentsModule,
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? ".env" : `.env.${ENV}`,
      load: [appConfig, dbConfig, cloudinaryConfig, mailConfig],
      validationSchema: environmentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoLoadEntities: configService.get("db.autoLoadEntities"),
        database: configService.get("db.name"),
        host: configService.get("db.host"),
        password: configService.get("db.password"),
        port: configService.get("db.port"),
        synchronize: configService.get("db.synchronize"),
        type: "postgres",
        username: configService.get("db.username"),
      }),
    }),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
