import express from "express";
import cors from "cors";
import { Request, Response, NextFunction } from "express-serve-static-core";
import piRouter from "./v1/routes/pi";
import userRouter from "./v1/routes/user";
import circumferenceRouter from "./v1/routes/circumference";
import { validateRequestToken } from "./middleware/auth";

let COUNTER = 0;
const MAX_PRECISION_FREE_USER = 15;

const app = express();

const whitelist = ["http://localhost:5173"];

const corsOptions: cors.CorsOptions = {
  origin: whitelist,
};

app.use(cors(corsOptions));

const PORT = 4000;

const getCounter = (req: Request, res: Response, next: NextFunction) => {
  const isPaidUser = res.locals.paidUser;
  res.locals.counter = isPaidUser
    ? COUNTER.toString()
    : MAX_PRECISION_FREE_USER;
  next();
};

app.use("/api", validateRequestToken);
app.use("/api/v1", getCounter, piRouter);
app.use("/api/v1", getCounter, circumferenceRouter);
app.use("/api/v1", userRouter);

app.listen(PORT, () => {
  setInterval(() => {
    COUNTER = COUNTER + 10;
  });

  console.log(`Running on Port ${PORT}`);
});
