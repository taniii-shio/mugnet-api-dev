"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const posts_1 = __importDefault(require("./routes/posts"));
const threads_1 = __importDefault(require("./routes/threads"));
const comments_1 = __importDefault(require("./routes/comments"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 8000;
// データベース接続
mongoose_1.default
    .connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.rqiinsr.mongodb.net/mugnet?retryWrites=true&w=majority`)
    .then(() => {
    console.log("mongodb connected");
})
    .catch((err) => {
    console.log(err);
});
// ミドルウェア
app.use(express_1.default.json());
app.use("/api/auth", auth_1.default);
app.use("/api/users", users_1.default);
app.use("/api/posts", posts_1.default);
app.use("/api/threads", threads_1.default);
app.use("/api/comments", comments_1.default);
app.get("/", (req, res) => {
    res.send("hello express");
});
// サーバー起動
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});
//# sourceMappingURL=server.js.map