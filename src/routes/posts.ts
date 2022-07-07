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

export default router;
