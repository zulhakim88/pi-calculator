import express, { NextFunction } from "express";
import { Request, Response } from "express-serve-static-core";
import piRouter from "./v1/routes/pi";
import circumferenceRouter from "./v1/routes/circumference";

let COUNTER = 0;

const app = express();

const PORT = 4000;

const getCounter = (req: Request, res: Response, next: NextFunction) => {
  res.locals.counter = COUNTER.toString();
  next();
};

app.use("/api/v1", getCounter, piRouter);
app.use("/api/v1", circumferenceRouter);

app.listen(PORT, () => {
  setInterval(() => {
    COUNTER++;
  });

  console.log(`Running on Port ${PORT}`);
});
