import express, { Request, Response } from "express";
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "no destination",
  // (req: any, res: any, cb: any) => {
  //   cb(null, "/public/images");
  // },
  filename: (req: any, file: any, cb: any) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
// 画像アップロード用のAPI
router.post("/", upload.single("file"), (req: Request, res: Response) => {
  try {
    return res.status(200).json("画像アップロードに成功しました。");
  } catch (err) {
    console.log(err);
  }
});

export default router;
