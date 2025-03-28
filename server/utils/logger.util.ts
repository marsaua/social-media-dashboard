import winston from "winston";

const { combine, timestamp, printf, errors, colorize } = winston.format;

const logFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  errors({ stack: true }),
  printf(({ timestamp, level, message, stack, ...metadata }) => {
    const metadataInfo =
      Object.keys(metadata).length === 0 ? "" : JSON.stringify(metadata);
    const messageInfo = stack || message;

    return `[${timestamp}] [${level}]: ${messageInfo} ${metadataInfo}`;
  }),
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "http",
  transports: [
    new winston.transports.File({
      filename: "logs/standard.log",
      format: logFormat,
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: "logs/rejections.log",
      format: logFormat,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: "logs/exceptions.log",
      format: logFormat,
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: combine(colorize(), logFormat),
      handleExceptions: true,
      handleRejections: true,
    }),
  );
}

export default logger;
