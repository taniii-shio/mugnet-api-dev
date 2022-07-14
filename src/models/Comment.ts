import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  threadId: string;
  userId: string;
  desc: string;
  likes: string[];
}

const CommentSchema: Schema = new mongoose.Schema(
  {
    threadId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IComment>("Comment", CommentSchema);
