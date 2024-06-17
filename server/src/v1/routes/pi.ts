import express from "express";
import { Request, Response } from "express-serve-static-core";
import { piCalculator } from "../../utils/piCalculator";

const router = express.Router();

router.get("/pi", (req: Request, res: Response) => {
  const counter = parseInt(res.locals.counter);
  const pi = piCalculator(counter);
  res.status(200).send({ pi, length: pi.length - 2 });
});

router.get("/pi/:digit", (req: Request, res: Response) => {
  const digit = parseInt(req.params.digit);
  const counter = parseInt(res.locals.counter);
  const isPaidUser = res.locals.paidUser;
  let pi = "";

  if (digit <= counter) {
    pi = piCalculator(digit);
  } else {
    pi = piCalculator(isPaidUser ? digit : counter);
  }

  return res.status(200).send({ pi, length: pi.length - 2 });
});

export default router;
