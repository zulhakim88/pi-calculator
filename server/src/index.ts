import express from "express";
import cors from "cors";
import piRouter from "./v1/routes/pi";
import userRouter from "./v1/routes/user";
import circumferenceRouter from "./v1/routes/circumference";
import { validateRequestToken } from "./middleware/auth";
import { getSystemCounter, setSystemCounter } from "./middleware/counter";

let COUNTER = 0;
const MAX_PRECISION_FREE_USER = 15;

const app = express();

const whitelist = ["http://localhost:5173"];

const corsOptions: cors.CorsOptions = {
  origin: whitelist,
};

app.use(cors(corsOptions));

const PORT = 4000;

app.use("/api", validateRequestToken);
app.use("/api/v1", getSystemCounter, piRouter);
app.use("/api/v1", getSystemCounter, circumferenceRouter);
app.use("/api/v1", userRouter);

app.listen(PORT, () => {
  setInterval(() => {
    setSystemCounter();
  });

  console.log(`Running on Port ${PORT}`);
});
