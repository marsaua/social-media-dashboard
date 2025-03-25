import mongoose from "mongoose";

import app from "app.ts";
import { PORT } from "configs/server.config.ts";
import logger from "utils/logger.util.ts";

mongoose.connection.once("open", () => {
  logger.info("Connected to MongoDB");

  app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}`);
  });
});
