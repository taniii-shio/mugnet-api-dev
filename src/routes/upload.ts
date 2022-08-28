import express, { Request, Response } from "express";
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const router = express.Router();

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const upload = (bucketName: string) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata: (req: any, file: any, cb: any) => {
        cb(null, { fieldname: file.fieldname });
      },
      key: (req: any, file: any, cb: any) => {
        cb(null, Date.now() + file.originalname);
      },
    }),
  });

const uploadSingle = upload("mugnet-api-dev").single("file");

// 画像アップロード用のAPI
router.post("/", (req: any, res: Response, next: any) => {
  uploadSingle(req, res, (err: any) => {
    if (err) {
      console.log("errors", err);
      res.json({ error: err });
    } else {
      if (req.file === undefined) {
        console.log("Error: No File Selected!");
        res.json("Error: No File Selected");
      } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        // Save the file name into database into profile model
        res.json({
          image: imageName,
          location: imageLocation,
        });
      }
    }
  });
  // try {
  //   return res.status(200).json("画像アップロードに成功しました。");
  // } catch (err) {
  //   console.log(err);
  // }
});

export default router;
