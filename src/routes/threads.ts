import express, { Request, Response } from "express";

import Thread from "../models/Thread";
import Post from "../models/Post";

const router = express.Router();

// スレッドの作成
router.post("/", async (req: Request, res: Response) => {
  const newThread = new Thread(req.body);
  try {
    const savedThread = await newThread.save();
    return res.status(200).json(savedThread);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 特定のスレッドの取得
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const thread = await Thread.findById(req.params.id);
    return res.status(200).json(thread);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 特定の投稿に紐付くスレッドの取得
router.get("/bypost/all", async (req: Request, res: Response) => {
  try {
    const currentPost: any = await Post.findById(req.body.postId);
    const currentPostThread = await Thread.find({ postId: currentPost._id });
    return res.status(200).json(currentPostThread);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// スレッドの削除
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const thread: any = await Thread.findById(req.params.id);
    if (thread.userId === req.body.userId) {
      await thread.deleteOne();
      return res.status(200).json("スレッドを削除しました");
    } else {
      return res
        .status(403)
        .json("あなたは他のユーザーのスレッドを削除できません");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default router;
