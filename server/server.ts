import mongoose from "mongoose";

import app from "app.ts";
import { PORT } from "configs/server.config.ts";

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
