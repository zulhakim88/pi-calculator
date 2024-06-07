import express from "express";
import { Request, Response } from "express-serve-static-core";
import { piCalculator } from "../../utils/piCalculator";

const router = express.Router();

router.get("/pi", (req: Request, res: Response) => {
  const isPaidUser = res.locals.paidUser;
  const counter = isPaidUser
    ? parseInt(res.locals.counter)
    : res.locals.MAX_PRECISION_FREE_USER;
  const pi = piCalculator([counter]);
  res.status(200).send({ pi, length: pi.length - 2 });
});

router.get("/pi/:digit", (req: Request, res: Response) => {
  let digit = 0;
  const isPaidUser = res.locals.paidUser;
  if (
    isPaidUser ||
    (!isPaidUser &&
      parseInt(req.params.digit) <= res.locals.MAX_PRECISION_FREE_USER)
  ) {
    digit = parseInt(req.params.digit);
  } else {
    digit = res.locals.MAX_PRECISION_FREE_USER;
  }
  const pi = piCalculator([digit]);

  res.status(200).send({ pi, length: pi.length - 2 });
});

export default router;
