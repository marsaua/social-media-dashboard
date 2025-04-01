import mongoose, { Document, Types } from "mongoose";

type PostModel = Document & {
  title: string;
  description: string;
  userId: Types.ObjectId;
  image?: string;
  totalComments: number;
};

const { Schema } = mongoose;

const postSchema = new Schema<PostModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: { type: String },
    totalComments: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    strict: true,
  },
);

const Post = mongoose.model<PostModel>("Post", postSchema);

export default Post;
