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
const Thread_1 = __importDefault(require("../models/Thread"));
const Post_1 = __importDefault(require("../models/Post"));
const router = express_1.default.Router();
// スレッドの作成
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newThread = new Thread_1.default(req.body);
    try {
        const savedThread = yield newThread.save();
        return res.status(200).json(savedThread);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// 特定のスレッドの取得
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thread = yield Thread_1.default.findById(req.params.id);
        return res.status(200).json(thread);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// 特定の投稿に紐付くスレッドの取得
router.get("/bypost/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentPost = yield Post_1.default.findById(req.params.id);
        const currentPostThread = yield Thread_1.default.find({ postId: currentPost._id });
        return res.status(200).json(currentPostThread);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// スレッドの削除
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thread = yield Thread_1.default.findById(req.params.id);
        if (thread.userId === req.body.userId) {
            yield thread.deleteOne();
            return res.status(200).json("スレッドを削除しました");
        }
        else {
            return res
                .status(403)
                .json("あなたは他のユーザーのスレッドを削除できません");
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
exports.default = router;
//# sourceMappingURL=threads.js.map