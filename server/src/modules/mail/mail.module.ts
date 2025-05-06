import { Global, Module } from "@nestjs/common";
import { MailService } from "src/modules/mail/providers/mail.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import * as path from "node:path";
import { EjsAdapter } from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get("smtp.host"),
          secure: false,
          port: 2525,
          auth: {
            user: configService.get("smtp.username"),
            pass: configService.get("smtp.password"),
          },
        },
        default: {
          from: "My social media <no-reply@smd.com>",
        },
        template: {
          dir: path.join(__dirname, "templates"),
          adapter: new EjsAdapter({
            inlineCssEnabled: true,
          }),
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  controllers: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
