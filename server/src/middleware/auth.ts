import { Request, Response, NextFunction } from "express-serve-static-core";
import admin, { ServiceAccount } from "firebase-admin";

import firebaseAccountCredentials from "../firebaseadmincred.json";
import { UserRecord } from "firebase-admin/auth";

export default admin.initializeApp({
  credential: admin.credential.cert(<ServiceAccount>firebaseAccountCredentials),
});

export const validateRequestToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: "Token Doesn't Exist!" });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send({ error: "Not a valid token!" });
  }
  try {
    const decodedtoken = await admin.auth().verifyIdToken(token);
    const user = await admin.auth().getUser(decodedtoken.user_id);
    res.locals.paidUser = checkForCustomClaims(user);
  } catch (e: any) {
    return res.status(401).send({ error: "Unauthorized access" });
  }
  res.locals.token = token;
  return next();
};

const checkForCustomClaims = (user: UserRecord): boolean => {
  if (!user.customClaims) {
    return false;
  } else {
    return user.customClaims.paiduser;
  }
};
