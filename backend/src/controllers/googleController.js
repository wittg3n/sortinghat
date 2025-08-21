import { google } from "googleapis";
import User from "../schema/User.js";
import jwt from "jsonwebtoken";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Step 1: Redirect user to Google consent screen
export const googleAuth = (req, res) => {
  const scopes = ["https://www.googleapis.com/auth/gmail.send"];
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  res.redirect(url);
};

// Step 2: Handle Google callback
export const googleCallback = async (req, res) => {
  const code = req.query.code;
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) return res.status(401).json({ error: "Missing JWT" });

  const token = tokenHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const { tokens } = await oauth2Client.getToken(code);
    await User.updateOne({ _id: decoded.id }, { googleTokens: tokens });
    res.json({ message: "Google connected!", tokens });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Step 3: Send Gmail
export const sendMail = async (req, res) => {
  const { to, subject, message } = req.body;
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) return res.status(401).json({ error: "Missing JWT" });

  const token = tokenHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user.googleTokens)
    return res.status(400).json({ error: "Connect Google first" });

  oauth2Client.setCredentials(user.googleTokens);
  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  const encodedMessage = Buffer.from(
    `To: ${to}\nSubject: ${subject}\n\n${message}`
  )
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  try {
    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: encodedMessage },
    });
    res.json({ message: "Email sent!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Step 4: Revoke Google access
export const revokeAccess = async (req, res) => {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) return res.status(401).json({ error: "Missing JWT" });

  const token = tokenHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  try {
    await oauth2Client.revokeCredentials();
    await User.updateOne({ _id: decoded.id }, { googleTokens: null });
    res.json({ message: "Google access revoked" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Step 5: Get Google profile
export const getProfile = async (req, res) => {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) return res.status(401).json({ error: "Missing JWT" });

  const token = tokenHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user.googleTokens)
    return res.status(400).json({ error: "Connect Google first" });

  oauth2Client.setCredentials(user.googleTokens);
  const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });

  try {
    const profile = await oauth2.userinfo.get();
    res.json(profile.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
