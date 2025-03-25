import winston from "winston";

const { combine, errors, colorize, timestamp, label, printf } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    label({ label: "SERVER", message: true }),
    colorize(),
    errors({ stack: true }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    printf(({ timestamp, level, message, stack }) => {
      return `[${timestamp}] [${level}]: ${stack || message}`;
    }),
  ),
  transports: [new winston.transports.File({ filename: "logs/standard.log" })],
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/exceptions.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "logs/rejections.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console());
}

export default logger;
