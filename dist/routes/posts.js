"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Post_1 = __importDefault(require("../models/Post"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// 投稿の作成
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = new Post_1.default(req.body);
    try {
        const savedPost = yield newPost.save();
        return res.status(200).json(savedPost);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// 全ての投稿を取得
router.get("/timeline/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPosts = yield Post_1.default.find();
        return res.status(200).json(allPosts);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// 特定の投稿の取得
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        return res.status(200).json(post);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// 特定のユーザーに紐付く投稿の取得
router.get("/byuser/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield User_1.default.findById(req.body.userId);
        const currentUserPost = yield Post_1.default.find({ userId: currentUser._id });
        return res.status(200).json(currentUserPost);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// 投稿の更新
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // メモ：型要検討
        const post = yield Post_1.default.findById(req.params.id);
        if (post.userId === req.body.userId) {
            yield post.updateOne({
                $set: req.body,
            });
            return res.status(200).json("投稿を更新しました");
        }
        else {
            return res.status(403).json("あなたは他のユーザーの投稿を編集できません");
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// 投稿の削除
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // メモ：型要検討
        const post = yield Post_1.default.findById(req.params.id);
        if (post.userId === req.body.userId) {
            yield post.deleteOne();
            return res.status(200).json("投稿を削除しました");
        }
        else {
            return res.status(403).json("あなたは他のユーザーの投稿を削除できません");
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// 特定の投稿へのいいね、いいね解除 型要検討
router.put("/:id/likePost", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            yield post.updateOne({
                $push: {
                    likes: req.body.userId,
                },
            });
            return res.status(200).json("投稿のいいねに成功しました");
        }
        else {
            yield post.updateOne({
                $pull: {
                    likes: req.body.userId,
                },
            });
            return res.status(200).json("投稿のいいねを解除しました");
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
exports.default = router;
//# sourceMappingURL=posts.js.map