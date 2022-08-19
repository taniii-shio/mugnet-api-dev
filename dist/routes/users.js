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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// 特定のユーザー情報の取得
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        const _a = user._doc, { password } = _a, other = __rest(_a, ["password"]);
        return res.status(200).json(other);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// 全ユーザー情報の取得(初期のレコメンドユーザー)
router.get("/recommend/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield User_1.default.find();
        const allUsersData = yield Promise.all(allUsers.map((user) => {
            const _a = user._doc, { password } = _a, other = __rest(_a, ["password"]);
            return other;
        }));
        return res.status(200).json(allUsersData);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// ユーザー情報の更新
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            yield User_1.default.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            return res.status(200).json("ユーザー情報が更新されました");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res
            .status(403)
            .json("あなたは自分のアカウントの時だけ情報を更新できます");
    }
}));
// ユーザー情報の削除
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            yield User_1.default.findByIdAndDelete(req.params.id);
            return res.status(200).json("ユーザー情報が削除されました");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res
            .status(403)
            .json("あなたは自分のアカウントの時だけ情報を削除できます");
    }
}));
// ユーザーのいいね
router.put("/:id/like", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.userId !== req.params.id) {
        try {
            // メモ：型要検討
            const user = yield User_1.default.findById(req.params.id);
            const currentUser = yield User_1.default.findById(req.body.userId);
            if (!user.liked.includes(req.body.userId)) {
                yield user.updateOne({
                    $push: {
                        liked: req.body.userId,
                    },
                });
                yield currentUser.updateOne({
                    $push: {
                        likes: req.params.id,
                    },
                });
                return res.status(200).json("いいねに成功しました");
            }
            else {
                return res
                    .status(403)
                    .json("あなたは既にこのユーザーをいいねしています");
            }
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(500).json("自分自身をいいねできません");
    }
}));
// ユーザーのいいね解除
router.put("/:id/unlike", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.userId !== req.params.id) {
        try {
            // メモ：型要検討
            const user = yield User_1.default.findById(req.params.id);
            const currentUser = yield User_1.default.findById(req.body.userId);
            if (user.liked.includes(req.body.userId)) {
                yield user.updateOne({
                    $pull: {
                        liked: req.body.userId,
                    },
                });
                yield currentUser.updateOne({
                    $pull: {
                        likes: req.params.id,
                    },
                });
                return res.status(200).json("いいね解除に成功しました");
            }
            else {
                return res.status(403).json("このユーザーはいいね解除できません");
            }
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(500).json("自分自身をいいね解除できません");
    }
}));
exports.default = router;
//# sourceMappingURL=users.js.map