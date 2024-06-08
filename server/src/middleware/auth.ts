import { Request, Response, NextFunction } from "express-serve-static-core";
import admin, { ServiceAccount } from "firebase-admin";

import firebaseAccountCredentials from "../firebaseadmincred.json";

export default admin.initializeApp({
  credential: admin.credential.cert(<ServiceAccount>firebaseAccountCredentials),
});

export const validateRequestToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ error: "Token Doesn't Exist!" });
  }
  try {
    const decodedtoken = await admin.auth().verifyIdToken(token);
    const user = await admin.auth().getUser(decodedtoken.user_id);
    if (!user.customClaims) {
      res.locals.paidUser = false;
    } else {
      res.locals.paidUser = user.customClaims.paiduser;
    }
  } catch (e: any) {
    return res.status(401).send({ error: "Unauthorized access" });
  }
  res.locals.token = token;
  return next();
};
