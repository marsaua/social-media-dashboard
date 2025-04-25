import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class BcryptProvider {
  public async hashPassword(password: string) {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  }

  public async comparePasswords(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
