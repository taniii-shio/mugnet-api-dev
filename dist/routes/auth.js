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
// ユーザー新規登録
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new User_1.default(req.body);
    try {
        const user = yield newUser.save();
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// ログイン
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user)
            return res.status(404).json("ユーザーが見つかりません");
        const _a = user._doc, { password } = _a, other = __rest(_a, ["password"]);
        const vailedPassowrd = req.body.password === user.password;
        if (!vailedPassowrd)
            return res.status(404).json("パスワードが違います");
        return res.status(200).json(other);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
exports.default = router;
//# sourceMappingURL=auth.js.map