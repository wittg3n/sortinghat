import express from "express";
import passport from "passport";
import userController from "../controllers/userController.js";

const router = express.Router();

// Signup route
router.post("/signup", userController.signup);

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  userController.login
);

// Protected routes - use JWT strategy
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  userController.getProfile
);

router.get(
  "/loggedin",
  passport.authenticate("jwt", { session: false }),
  userController.isLoggedIn
);

router.delete("/logout", userController.logout);
router.post("/validate-token", userController.tokenValidator);
export default router;
