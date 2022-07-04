import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoute from "./routes/auth";
import userRoute from "./routes/users";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

// データベース接続
mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.rqiinsr.mongodb.net/mugnet?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

// ミドルウェア
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("hello express");
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
