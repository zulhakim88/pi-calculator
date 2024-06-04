import express from "express";
import { Request, Response } from "express-serve-static-core";
import { piCalculator } from "../../utils/piCalculator";

const router = express.Router();

router.get("/pi", (req: Request, res: Response) => {
  const counter = parseInt(res.locals.counter);
  const pi = piCalculator([counter]);
  res.status(200).send({ pi });
});

export default router;
