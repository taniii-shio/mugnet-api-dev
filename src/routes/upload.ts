import express from "express";
import { v4 as uuidv4 } from "uuid";
const aws = require("aws-sdk");
const base64 = require("urlsafe-base64");

const router = express.Router();

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

// 画像upload
router.post("/", (req, res) => {
  const base64_data = req.body.base64_data;
  const decode_data = base64.decode(base64_data);
  const imageId = uuidv4();
  const params = {
    Bucket: "mugnet-api-dev",
    ACL: "public-read",
    ContentType: "image/png",
    Key: imageId,
    Body: decode_data,
  };
  try {
    s3.putObject(params, (err: any, data: any) => {
      if (err) {
        console.log("失敗");
        return;
      }
      return res.status(200).json({
        imageUrl: `https://d66zd1akme4e.cloudfront.net/${imageId}`,
      });
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default router;
