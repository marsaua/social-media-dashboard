import { registerAs } from "@nestjs/config";

export const ENV = process.env.NODE_ENV;
export const apiVersion = "v1";
export const globalPrefix = `api/${apiVersion}`;

export default registerAs("app", () => ({
  environment: process.env.NODE_ENV || "production",
}));
