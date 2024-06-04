import express from "express";
import { Request, Response } from "express-serve-static-core";

const router = express.Router();

router.get("/circumference", (req: Request, res: Response) => {
  res.status(202).send("hello world this is from Circumferenece Endpoint");
});

export default router;
