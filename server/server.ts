import mongoose from "mongoose";

import app from "app.ts";
import { PORT } from "configs/server.config.ts";
import logger from "utils/logger.util.ts";
import setupSwagger from "configs/swagger.config.ts";

mongoose.connection.once("open", () => {
  logger.info("MongoDB connected");

  app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}`);
    setupSwagger(app);
  });
});

mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  logger.error(`MongoDB connection error: ${err?.message}`);
});
