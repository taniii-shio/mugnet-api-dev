import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  isAdmin: boolean;
  likes: string[];
  liked: string[];
  // 基本情報
  name: string;
  desc: string;
  profilePicture: Number;
  coverPicture: string;
  schoolYear: Number;
  faculty: string;
  sex: string;
  // コアプロフィール
  bloodType: Number;
  birthDay: Number;
  birthPlace: Number;
  affiliation: string;
  // 価値観
  hobby: String;
  behavioralPreferences: Number;
  specialSkill: String;
  favoriteMusic: String;
  favoriteBook: String;
  favoriteMovie: String;
  favoriteYoutuber: String;
  favoriteEntertainer: String;
  likePlace: String;
  likeRestaurant: String;
  wantToDo: String;
  recentChallenges: String;
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
    name: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: Number,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    schoolYear: {
      type: Number,
      default: 0,
    },
    faculty: {
      type: String,
      default: "",
    },
    sex: {
      type: String,
      default: "0",
    },
    // コアプロフィール
    bloodType: {
      type: Number,
      deafult: 0,
    },
    birthDay: {
      type: Number,
      deafult: 0,
    },
    birthPlace: {
      type: Number,
      deafult: 0,
    },
    affiliation: {
      type: String,
      default: "",
    },
    // 価値観
    hobby: {
      type: String,
      default: "",
    },
    behavioralPreferences: {
      type: Number,
      default: 0,
    },
    specialSkill: {
      type: String,
      default: "",
    },
    favoriteMusic: {
      type: String,
      default: "",
    },
    favoriteBook: {
      type: String,
      default: "",
    },
    favoriteMovie: {
      type: String,
      default: "",
    },
    favoriteYoutuber: {
      type: String,
      default: "",
    },
    favoriteEntertainer: {
      type: String,
      default: "",
    },
    likePlace: {
      type: String,
      default: "",
    },
    likeRestaurant: {
      type: String,
      default: "",
    },
    wantToDo: {
      type: String,
      default: "",
    },
    recentChallenges: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
