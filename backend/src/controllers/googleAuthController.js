import { google } from "googleapis";
import User from "../schema/User.js";
import jwt from "jsonwebtoken";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

export const googleSignup = async (req, res) => {
  const { code } = req.body;
  console.log("Received code from frontend:", code);

  if (!code) {
    console.error("No code received in request body");
    return res.status(400).json({ error: "Missing code" });
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    );
    console.log("OAuth2 client created");

    const { tokens } = await oauth2Client.getToken(code);
    console.log("Tokens received from Google:", tokens);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const profile = await oauth2.userinfo.get();
    console.log("Google user profile data:", profile.data);

    const { id: googleId, email, name, picture } = profile.data;

    // Find or create user
    let user = await User.findOne({ $or: [{ email }, { googleId }] });
    console.log("Found user in DB:", user);

    if (!user) {
      user = await User.create({ email, googleId, password: null });
      console.log("Created new user:", user);
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
      console.log("Updated existing user with googleId:", user);
    }

    const appToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log("JWT created for user:", appToken);

    res.json({
      message: "Logged in with Google",
      token: appToken,
      user: { id: user._id, email, name, picture },
    });
  } catch (err) {
    console.error("Google signup error:", err);
    res
      .status(500)
      .json({ error: "Google signup failed", details: err.message });
  }
};
