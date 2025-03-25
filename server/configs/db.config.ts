import mongoose from "mongoose";

import logger from "utils/logger.util.ts";

const connectDb = async () => {
  const uri = process.env.DATABASE_URI || "";

  try {
    await mongoose.connect(uri);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err);
    }
  }
};

export default connectDb;
