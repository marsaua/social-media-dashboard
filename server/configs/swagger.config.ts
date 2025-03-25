import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import { PORT } from "configs/server.config.ts";

const setupSwagger = (app: Express) => {
  const swaggerDocument = YAML.load("docs/openapi.yaml");

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  console.log(`Docs are running on http://localhost:${PORT}/docs`);
};

export default setupSwagger;
