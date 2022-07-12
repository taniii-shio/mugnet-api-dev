import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  userId: string;
  categoryTag: Number;
  desc: string;
  postPicture: string;
  comments: string[];
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
    desc: {
      type: String,
      required: true,
      max: 200,
    },
    postPicture: {
      type: String,
      default: "",
    },
    comments: {
      type: Array,
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", PostSchema);
