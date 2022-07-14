import express, { Request, Response } from "express";

import Comment from "../models/Comment";

const router = express.Router();

// コメントの作成
router.post("/", async (req: Request, res: Response) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    return res.status(200).json(savedComment);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 特定のコメントの取得
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findById(req.params.id);
    return res.status(200).json(comment);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 特定のスレッドに紐付くコメントの取得

// コメントの削除
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const comment: any = await Comment.findById(req.params.id);
    if (comment.userId === req.body.userId) {
      await comment.deleteOne();
      return res.status(200).json("コメントを削除しました");
    } else {
      return res
        .status(403)
        .json("あなたは他のユーザーのコメントを削除できません");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default router;
