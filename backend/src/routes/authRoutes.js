import express from "express";
import passport from "passport";
import multer from "multer";
import userController from "../controllers/userController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Signup route
router.post("/signup", userController.signup);

// Login route - still uses local strategy to validate credentials
// but now we generate JWT manually in controller
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

router.put(
  "/profile/picture",
  passport.authenticate("jwt", { session: false }),
  upload.single("profilePicture"),
  userController.updateProfilePicture
);
router.get(
  "/loggedin",
  passport.authenticate("jwt", { session: false }),
  userController.isLoggedIn
);
router.delete("/logout", userController.logout);
router.post("/validate-token", userController.tokenValidator);
export default router;
