import express, { Request, Response } from "express";

import User from "../models/User";

const router = express.Router();

// 特定のユーザー情報の取得
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const user: any = await User.findById(req.params.id);
    const { password, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 全ユーザー情報の取得(初期のレコメンドユーザー)
router.get("/recommend/all", async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find();
    const allUsersData = await Promise.all(
      allUsers.map((user: any) => {
        const { password, ...other } = user._doc;
        return other;
      })
    );
    return res.status(200).json(allUsersData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// ユーザー情報の更新
router.put("/:id", async (req: Request, res: Response) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      return res.status(200).json("ユーザー情報が更新されました");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json("あなたは自分のアカウントの時だけ情報を更新できます");
  }
});

// ユーザー情報の削除
router.delete("/:id", async (req: Request, res: Response) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("ユーザー情報が削除されました");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json("あなたは自分のアカウントの時だけ情報を削除できます");
  }
});

// ユーザーのいいね
router.put("/:id/like", async (req: Request, res: Response) => {
  if (req.body.userId !== req.params.id) {
    try {
      // メモ：型要検討
      const user: any = await User.findById(req.params.id);
      const currentUser: any = await User.findById(req.body.userId);
      if (!user.liked.includes(req.body.userId)) {
        await user.updateOne({
          $push: {
            liked: req.body.userId,
          },
        });
        await currentUser.updateOne({
          $push: {
            likes: req.params.id,
          },
        });
        return res.status(200).json("いいねに成功しました");
      } else {
        return res
          .status(403)
          .json("あなたは既にこのユーザーをいいねしています");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("自分自身をいいねできません");
  }
});

// ユーザーのいいね解除
router.put("/:id/unlike", async (req: Request, res: Response) => {
  if (req.body.userId !== req.params.id) {
    try {
      // メモ：型要検討
      const user: any = await User.findById(req.params.id);
      const currentUser: any = await User.findById(req.body.userId);
      if (user.liked.includes(req.body.userId)) {
        await user.updateOne({
          $pull: {
            liked: req.body.userId,
          },
        });
        await currentUser.updateOne({
          $pull: {
            likes: req.params.id,
          },
        });
        return res.status(200).json("いいね解除に成功しました");
      } else {
        return res.status(403).json("このユーザーはいいね解除できません");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("自分自身をいいね解除できません");
  }
});

export default router;
