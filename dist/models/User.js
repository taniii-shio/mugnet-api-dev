"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
exports.default = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=User.js.map