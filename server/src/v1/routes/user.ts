import express from "express";
import { Request, Response } from "express-serve-static-core";
import admin from "../../middleware/auth";

const router = express.Router();

router.get("/user/default-claims", async (req: Request, res: Response) => {
  try {
    const token = res.locals.token;
    const decodedtoken = await admin.auth().verifyIdToken(token);
    const user = await admin.auth().getUser(decodedtoken.user_id);
    await admin.auth().setCustomUserClaims(user.uid, {
      paiduser: false,
    });
    res.status(200).send({ isPaidUser: false });
  } catch (e: any) {
    return res.status(401).send({ error: "Unauthorized access" });
  }
});

router.get("/user/upgrade", async (req: Request, res: Response) => {
  try {
    const token = res.locals.token;
    const decodedtoken = await admin.auth().verifyIdToken(token);
    const user = await admin.auth().getUser(decodedtoken.user_id);
    if (!user.customClaims) {
      return res.status(403).send({ error: "Invalid user to upgrade!" });
    } else if (user.customClaims.paiduser === true) {
      return res.status(403).send({ error: "Cannot upgrade upgraded user!" });
    } else {
      try {
        await admin.auth().setCustomUserClaims(user.uid, {
          paiduser: true,
        });
        return res.status(200).send({
          isPaidUser: true,
        });
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e: any) {
    return res.status(401).send({ error: "Unauthorized access" });
  }
});

export default router;
