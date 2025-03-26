import morgan from "morgan";

import logger from "utils/logger.util.ts";

const morganLogger = morgan("combined", {
  stream: {
    write: (message) => logger.http(message.trim()),
  },
});

export default morganLogger;
