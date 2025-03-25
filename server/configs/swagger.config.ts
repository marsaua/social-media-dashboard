import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import { PORT } from "configs/server.config.ts";
import logger from "utils/logger.util.ts";

const setupSwagger = (app: Express) => {
  const swaggerDocument = YAML.load("docs/openapi.yaml");

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  logger.info(`Docs running at http://localhost:${PORT}/docs`);
};

export default setupSwagger;
