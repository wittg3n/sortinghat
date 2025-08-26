import express from "express";
import {
  googleAuth,
  googleCallback,
  sendMail,
} from "../controllers/googleController.js";

const router = express.Router();

router.get("/google-auth", googleAuth);
router.get("/google-auth/callback", googleCallback);
router.post("/send", sendMail);

export default router;
