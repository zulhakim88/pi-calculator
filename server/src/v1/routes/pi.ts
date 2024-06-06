import express from "express";
import { Request, Response } from "express-serve-static-core";
import { piCalculator } from "../../utils/piCalculator";

const router = express.Router();

const MAX_PRECISION_FREE_USER = 15;

router.get("/pi", (req: Request, res: Response) => {
  const isPaidUser = res.locals.paidUser;
  const counter = isPaidUser
    ? parseInt(res.locals.counter)
    : MAX_PRECISION_FREE_USER;
  const pi = piCalculator([counter]);
  res.status(200).send({ pi, length: pi.length });
});

router.get("/pi/:digit", (req: Request, res: Response) => {
  let digit = 0;
  const isPaidUser = res.locals.paidUser;
  if (isPaidUser) {
    digit = parseInt(req.params.digit);
  } else if (
    !isPaidUser &&
    parseInt(req.params.digit) <= MAX_PRECISION_FREE_USER
  ) {
    digit = parseInt(req.params.digit);
  } else {
    digit = MAX_PRECISION_FREE_USER;
  }
  const pi = piCalculator([digit]);

  res.status(200).send({ pi, length: pi.length });
});

export default router;
