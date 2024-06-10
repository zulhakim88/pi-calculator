import { Request, Response, NextFunction } from "express-serve-static-core";

const MAX_PRECISION_FREE_USER = 15;

let COUNTER = 0;

export const setSystemCounter = () => {
  COUNTER = COUNTER + 10;
};

export const getSystemCounter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isPaidUser = res.locals.paidUser;
  res.locals.counter = isPaidUser
    ? COUNTER.toString()
    : MAX_PRECISION_FREE_USER;
  next();
};
