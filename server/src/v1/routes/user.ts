import express from "express";
import { Request, Response } from "express-serve-static-core";
import admin from "../../middleware/auth";
import { UserRecord } from "firebase-admin/auth";

const router = express.Router();

router.get("/user/upgrade", async (req: Request, res: Response) => {
  const token = res.locals.token;

  try {
    const decodedtoken = await admin.auth().verifyIdToken(token);
    const user = await admin.auth().getUser(decodedtoken.user_id);
    return await upgradeUser(res, user);
  } catch (e: any) {
    return res.status(401).send({ error: "Unauthorized access" });
  }
});

router.get("/user/downgrade", async (req: Request, res: Response) => {
  const token = res.locals.token;

  try {
    const decodedtoken = await admin.auth().verifyIdToken(token);
    const user = await admin.auth().getUser(decodedtoken.user_id);
    return await downgradeUser(res, user);
  } catch (e: any) {
    return res.status(401).send({ error: "Unauthorized access" });
  }
});

const upgradeUser = async (res: Response, user: UserRecord) => {
  const paidUser = res.locals.paidUser;

  if (paidUser) {
    return res.status(403).send({ error: "User is already a paid user!" });
  }

  try {
    await admin.auth().setCustomUserClaims(user.uid, {
      paiduser: true,
    });
    return res.status(200).send({
      isPaidUser: true,
    });
  } catch (e) {
    console.log(e);
    return res.status(403).send({ error: "Failed to upgrade User" });
  }
};

const downgradeUser = async (res: Response, user: UserRecord) => {
  const paidUser = res.locals.paidUser;

  if (!paidUser) {
    return res.status(403).send({ error: "User is already a free user!" });
  }

  try {
    await admin.auth().setCustomUserClaims(user.uid, {
      paiduser: false,
    });
    return res.status(200).send({
      isPaidUser: false,
    });
  } catch (e) {
    console.log(e);
    return res.status(403).send({ error: "Failed to downgrade User!" });
  }
};

export default router;
