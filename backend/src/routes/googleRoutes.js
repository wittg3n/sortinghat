import express from "express";
import {
  googleAuth,
  googleCallback,
  sendMail,
} from "../controllers/googleController.js";

const router = express.Router();

router.get("/auth", googleAuth);
router.get("/auth/callback", googleCallback);
router.post("/send", sendMail);

export default router;
