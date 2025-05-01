import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { ActiveUserData } from "src/modules/auth/interfaces/active-user-data.interface";
import { REQUEST_USER_KEY } from "src/modules/auth/constants/auth.constants";

export const ActiveUser = createParamDecorator((field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();

  const activeUserData: ActiveUserData | undefined = request[REQUEST_USER_KEY];

  return field ? activeUserData?.[field] : activeUserData;
});
