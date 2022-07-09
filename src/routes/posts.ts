import express, { Request, Response } from "express";

import Post from "../models/Post";

const router = express.Router();

// 投稿の作成
router.post("/", async (req: Request, res: Response) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 投稿の取得
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 投稿の更新
router.put("/:id", async (req: Request, res: Response) => {
  try {
    // メモ：型要検討
    const post: any = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({
        $set: req.body,
      });
      return res.status(200).json("投稿を更新しました");
    } else {
      return res.status(403).json("あなたは他のユーザーの投稿を編集できません");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 投稿の削除
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    // メモ：型要検討
    const post: any = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      return res.status(200).json("投稿を削除しました");
    } else {
      return res.status(403).json("あなたは他のユーザーの投稿を削除できません");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default router;
