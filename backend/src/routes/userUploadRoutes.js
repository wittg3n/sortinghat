import express from "express";
import passport from "passport";
import userController from "../controllers/userController.js";
import upload from "../middleware/upload.js";
import path from "path";
import { nanoid } from "nanoid";

const router = express.Router();

// http://localhost:5000/api/v1/user/upload/profile-picture
router.post(
  "/profile-picture",
  passport.authenticate("jwt", { session: false }),
  upload.single("profilePicture"),
  userController.uploadProfilePictureWithScan
);
export default router;
