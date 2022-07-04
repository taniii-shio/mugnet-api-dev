import express, { Request, Response } from "express";

import User from "../models/User";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("auth test");
});

export default router;
