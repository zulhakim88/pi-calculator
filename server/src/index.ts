import express from "express";
import cors from "cors";
import { Request, Response, NextFunction } from "express-serve-static-core";
import piRouter from "./v1/routes/pi";
import userRouter from "./v1/routes/user";
import circumferenceRouter from "./v1/routes/circumference";
import { validateRequestToken } from "./middleware/auth";

let COUNTER = 0;

const app = express();

const whitelist = ["http://localhost:5173"];
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

const PORT = 4000;

const getCounter = (req: Request, res: Response, next: NextFunction) => {
  res.locals.counter = COUNTER.toString();
  next();
};

app.use("/api", validateRequestToken);
app.use("/api/v1", getCounter, piRouter);
app.use("/api/v1", circumferenceRouter);
app.use("/api/v1", userRouter);

app.listen(PORT, () => {
  setInterval(() => {
    COUNTER = COUNTER + 10;
  });

  console.log(`Running on Port ${PORT}`);
});
