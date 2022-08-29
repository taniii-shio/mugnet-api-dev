import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  isAdmin: boolean;
  likes: string[];
  liked: string[];
  // 基本情報
  username: string;
  name: string;
  profilePicture: string;
  instagramUrl: string;
  circle: string;
}

const UserSchema: Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 50,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: Array,
      default: [],
    },
    liked: {
      type: Array,
      default: [],
    },
    // 基本情報
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    instagramUrl: {
      type: String,
      default: "",
    },
    circle: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
