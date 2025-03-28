import morgan from "morgan";

import logger from "utils/logger.util.ts";

const requestLogger = morgan("combined", {
  stream: {
    write: (message) => logger.http(message.trim()),
  },
});

export default requestLogger;
