import { CookieOptions } from "express";
import { ENV, globalPrefix } from "src/config/app.config";
import { refreshTokenTtl } from "src/modules/auth/config/jwt.config";

export const refreshTokenCookieName = "refresh_token";

export const refreshTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: ENV === "production",
  sameSite: "lax",
  path: `/${globalPrefix}/auth/refresh-tokens`,
  maxAge: refreshTokenTtl * 1000, // 14 days in milliseconds
};
