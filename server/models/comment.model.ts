import mongoose, { Document, Types } from "mongoose";

type CommentModel = Document & {
  text: string;
  postId: Types.ObjectId;
  userId: Types.ObjectId;
};

const { Schema } = mongoose;

const commentSchema = new Schema<CommentModel>(
  {
    text: {
      type: String,
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Comment = mongoose.model<CommentModel>("Comment", commentSchema);

export default Comment;
