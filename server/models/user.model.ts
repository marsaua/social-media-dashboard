import mongoose, { Document } from "mongoose";

type UserModel = Document & {
  username: string;
  password: string;
  firstName: string;
  lastName?: string;
  avatar: string | null;
  refreshToken: string | null;
};

const { Schema } = mongoose;

const userSchema = new Schema<UserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
    avatar: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    strict: true,
  },
);

const User = mongoose.model<UserModel>("User", userSchema);

export default User;
