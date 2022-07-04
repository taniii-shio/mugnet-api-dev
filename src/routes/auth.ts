import express, { Request, Response } from "express";

import User from "../models/User";

const router = express.Router();

// ユーザー新規登録
router.post("/register", async (req: Request, res: Response) => {
  try {
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// ログイン
router.post("/login", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("ユーザーが見つかりません");

    const vailedPassowrd = req.body.password === user.password;
    if (!vailedPassowrd) return res.status(404).json("パスワードが違います");

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default router;
