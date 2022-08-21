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
const Comment_1 = __importDefault(require("../models/Comment"));
const Thread_1 = __importDefault(require("../models/Thread"));
const router = express_1.default.Router();
// コメントの作成
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newComment = new Comment_1.default(req.body);
    try {
        const savedComment = yield newComment.save();
        return res.status(200).json(savedComment);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// 特定のコメントの取得
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield Comment_1.default.findById(req.params.id);
        return res.status(200).json(comment);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// 特定のスレッドに紐付くコメントの取得
router.get("/bythread/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentThread = yield Thread_1.default.findById(req.body.threadId);
        const currentThreadCommnt = yield Comment_1.default.find({
            threadId: currentThread._id,
        });
        return res.status(200).json(currentThreadCommnt);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// コメントの削除
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield Comment_1.default.findById(req.params.id);
        if (comment.userId === req.body.userId) {
            yield comment.deleteOne();
            return res.status(200).json("コメントを削除しました");
        }
        else {
            return res
                .status(403)
                .json("あなたは他のユーザーのコメントを削除できません");
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
exports.default = router;
//# sourceMappingURL=comments.js.map