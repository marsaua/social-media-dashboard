import mongoose, { Document } from "mongoose";

type UserModel = Document & {
  username: string;
  password: string;
  firstName: string;
  lastName?: string;
  avatar?: string;
  refreshToken?: string;
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
    avatar: String,
    refreshToken: String,
  },
  {
    timestamps: true,
    strict: true,
  },
);

const User = mongoose.model<UserModel>("User", userSchema);

export default User;
