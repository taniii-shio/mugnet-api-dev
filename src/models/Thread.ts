import mongoose, { Schema, Document } from "mongoose";

export interface IThread extends Document {
  postId: string;
  userId: string;
  desc: string;
  likes: string[];
}

const ThreadSchema: Schema = new mongoose.Schema(
  {
    postId: {
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

export default mongoose.model<IThread>("Thread", ThreadSchema);
