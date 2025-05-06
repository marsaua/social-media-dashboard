import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { User } from "src/modules/users/user.entity";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendUserWelcome(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      from: "Onboarding Team <support@smd.com>",
      subject: "Welcome to the SMD",
      template: "./welcome",
      context: {
        name: user.firstName,
        email: user.email,
        loginUrl: "http://localhost:8080",
      },
    });
  }
}
