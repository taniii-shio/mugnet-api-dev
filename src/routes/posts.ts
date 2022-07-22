import express, { Request, Response } from "express";

import Post from "../models/Post";
import User from "../models/User";

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

// 全ての投稿を取得
router.get("/timeline/all", async (req: Request, res: Response) => {
  try {
    const allPosts = await Post.find();
    return res.status(200).json(allPosts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 特定の投稿の取得
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 特定のユーザーに紐付く投稿の取得
router.get("/byuser/all", async (req: Request, res: Response) => {
  try {
    const currentUser: any = await User.findById(req.body.userId);
    const currentUserPost = await Post.find({ userId: currentUser._id });
    return res.status(200).json(currentUserPost);
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

// 特定の投稿へのいいね、いいね解除 型要検討
router.put("/:id/likePost", async (req: Request, res: Response) => {
  try {
    const post: any = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({
        $push: {
          likes: req.body.userId,
        },
      });
      return res.status(200).json("投稿のいいねに成功しました");
    } else {
      await post.updateOne({
        $pull: {
          likes: req.body.userId,
        },
      });
      return res.status(200).json("投稿のいいねを解除しました");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default router;
