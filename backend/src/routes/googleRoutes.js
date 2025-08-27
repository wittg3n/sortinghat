// /backend/routes/googleRoutes.js
import express from "express";
import {
  googleAuth,
  googleCallback,
  sendMail,
} from "../controllers/googleController.js";
import { googleSignup } from "../controllers/googleAuthController.js";

const router = express.Router();

router.post("/signup", googleSignup); // << new endpoint
router.get("/google-auth", googleAuth);
router.get("/google-auth/callback", googleCallback);
router.post("/send", sendMail);

export default router;
