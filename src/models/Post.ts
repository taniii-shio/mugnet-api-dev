import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  userId: string;
  categoryTag: Number;
  title: string;
  desc: string;
  likes: string[];
}

const PostSchema: Schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    categoryTag: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
      max: 200,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", PostSchema);
