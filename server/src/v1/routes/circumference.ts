import express from "express";
import { Request, Response } from "express-serve-static-core";
import { piCalculator } from "../../utils/piCalculator";
import { calculateCircumference } from "../../utils/circumferenceCalculator";

const router = express.Router();

router.get("/circumference/:radius", (req: Request, res: Response) => {
  const counter = parseInt(res.locals.counter);
  const radius = parseInt(req.params.radius);
  const pi = piCalculator(counter);
  const circumference = calculateCircumference(pi, radius);
  res.status(200).send({ piLength: pi.length - 2, circumference });
});

export default router;
