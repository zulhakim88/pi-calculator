import express from "express";
import { Request, Response } from "express-serve-static-core";
import { piCalculator } from "../../utils/piCalculator";
import { calculateCircumference } from "../../utils/circumferenceCalculator";

const router = express.Router();

router.get("/circumference/:radius", (req: Request, res: Response) => {
  let digit = 0;
  const radius = parseInt(req.params.radius);
  const isPaidUser = res.locals.paidUser;
  if (
    isPaidUser ||
    (!isPaidUser &&
      parseInt(res.locals.counter) <= res.locals.MAX_PRECISION_FREE_USER)
  ) {
    digit = parseInt(res.locals.counter);
  } else {
    digit = res.locals.MAX_PRECISION_FREE_USER;
  }
  const pi = piCalculator([digit]);
  const circumference = calculateCircumference(pi, radius);
  res.status(200).send({ piLength: pi.length - 2, circumference });
});

export default router;
