import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  userId: string;
  desc: string;
}

const PostSchema: Schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 200,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", PostSchema);
