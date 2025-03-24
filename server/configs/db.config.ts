import mongoose from "mongoose";

const connectDb = async () => {
  const uri = process.env.DATABASE_URI || "";

  try {
    await mongoose.connect(uri);
  } catch (err) {
    console.error(err);
  }
};

export default connectDb;
