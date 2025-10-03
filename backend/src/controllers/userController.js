import jwt from "jsonwebtoken";
import User from "../schema/User.js";
import fs from "fs";
import { scanFileWithVirusTotal } from "../middleware/virusTotal.js";
import path from "path";
import { nanoid } from "nanoid";
import { fileTypeFromFile } from "file-type";
const uploadRateLimitMap = new Map();
const UPLOAD_LIMIT = 5; // max uploads
const WINDOW_MS = 60 * 1000;

const fsPromises = fs.promises;
const generateToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // Token expires in 7 days
  );

const cookieOptions = {
  httpOnly: true, // cannot be accessed by JS
  secure: process.env.NODE_ENV === "production", // HTTPS only in production
  sameSite: "strict", // prevents CSRF
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
};

const userController = {
  // ------------------- SIGNUP -------------------
  signup: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "Email already exists" });

      const newUser = new User({ name, email, password });
      try {
        await newUser.save();
      } catch (err) {
        if (err.code === 11000) {
          if (err.keyPattern?.email) {
            return res.status(400).json({ message: "Email already exists" });
          }
          if (err.keyPattern?.phone) {
            return res
              .status(400)
              .json({ message: "Phone number already exists" });
          }
        }
        console.error("Signup error:", err);
        return res.status(500).json({ message: "Server error" });
      }

      const token = generateToken(newUser);

      // Send token as HttpOnly cookie
      res.cookie("token", token, cookieOptions);

      res.status(201).json({ message: "User created" }); // no need to send token in JSON
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  // ------------------- LOGIN -------------------
  login: async (req, res) => {
    try {
      const token = generateToken(req.user);

      // Send token as HttpOnly cookie
      res.cookie("token", token, cookieOptions);

      res.status(200).json({ message: "Logged in successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  // ------------------- GET PROFILE -------------------
  getProfile: (req, res) => {
    if (!req.user)
      return res.status(401).json({ message: "Not authenticated" });

    res.status(200).json({
      name: req.user.name,
      email: req.user.email,
      profilePicture: req.user.profilePicture
        ? `/uploads/${req.user.profilePicture}`
        : null,
    });
  },

  // ------------------- UPDATE PROFILE PICTURE -------------------
  updateProfilePicture: async (req, res) => {
    try {
      if (!req.file)
        return res.status(400).json({ message: "No file uploaded" });

      req.user.profilePicture = req.file.filename;
      await req.user.save();

      res.status(200).json({ message: "Profile picture updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  // ------------------- LOGOUT -------------------
  logout: (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
  },

  // ------------------- CHECK LOGIN -------------------
  isLoggedIn: (req, res) => {
    if (!req.user)
      return res
        .status(401)
        .json({ loggedIn: false, message: "Not logged in" });

    res.status(200).json({ loggedIn: true, message: "User is logged in" });
  },

  // ------------------- TOKEN VALIDATOR -------------------
  tokenValidator: (req, res) => {
    const token = req.cookies?.token || req.body.token; // check cookie first
    if (!token) {
      return res
        .status(400)
        .json({ valid: false, message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return res.status(200).json({ valid: true, user: decoded });
    } catch (err) {
      return res
        .status(401)
        .json({ valid: false, message: "Invalid or expired token" });
    }
  },
  uploadProfilePictureWithScan: async (req, res) => {
    try {
      if (!req.user)
        return res.status(401).json({ message: "Not authenticated" });
      if (!req.file)
        return res.status(400).json({ message: "No file uploaded" });

      // ------------------ Rate Limit ------------------
      const userId = req.user._id.toString();
      const now = Date.now();
      const timestamps = uploadRateLimitMap.get(userId) || [];
      const recent = timestamps.filter((ts) => now - ts < WINDOW_MS);

      if (recent.length >= UPLOAD_LIMIT) {
        await fsPromises.unlink(req.file.path).catch(() => {});
        return res
          .status(429)
          .json({ message: "Too many uploads, please wait." });
      }

      recent.push(now);
      uploadRateLimitMap.set(userId, recent);

      // ------------------ Ensure tmp folder exists ------------------
      const tmpDir = path.join(process.cwd(), "tmp");
      await fsPromises.mkdir(tmpDir, { recursive: true });

      // ------------------ Validate file type ------------------
      const fileType = await fileTypeFromFile(req.file.path);
      if (
        !fileType ||
        !["image/png", "image/jpeg", "image/webp"].includes(fileType.mime)
      ) {
        await fsPromises.unlink(req.file.path);
        return res
          .status(400)
          .json({ message: "Invalid file type. Only images allowed." });
      }

      // ------------------ VirusTotal Scan ------------------
      let stats = {};
      try {
        const attrs = await scanFileWithVirusTotal(req.file.path, {
          apiKey: process.env.VIRUSTOTAL_API_KEY,
          timeoutMs: 30000,
        });
        stats = attrs?.data?.attributes?.last_analysis_stats || {};
      } catch (err) {
        if (err.response?.status === 409) {
          console.warn("File already queued/scanned. Proceeding with upload.");
          stats = { info: "File already scanned or queued" };
        } else {
          console.error("VirusTotal scan error:", err);
          await fsPromises.unlink(req.file.path).catch(() => {});
          return res.status(500).json({ message: "Virus scan failed" });
        }
      }

      // Reject malicious or suspicious files
      if ((stats.malicious || 0) > 0 || (stats.suspicious || 0) > 0) {
        await fsPromises.unlink(req.file.path);
        return res
          .status(400)
          .json({ message: "File rejected (malicious)", stats });
      }

      // ------------------ Move to uploads ------------------
      const uploadsDir = path.join(process.cwd(), "uploads");
      await fsPromises.mkdir(uploadsDir, { recursive: true });

      const safeFilename = path.basename(req.file.originalname);
      const finalName = `${Date.now()}-${nanoid(8)}${path.extname(
        safeFilename
      )}`;
      const finalPath = path.join(uploadsDir, finalName);

      await fsPromises.rename(req.file.path, finalPath);

      // ------------------ Delete old picture ------------------
      if (req.user.profilePicture) {
        const oldPath = path.join(
          uploadsDir,
          path.basename(req.user.profilePicture)
        );
        try {
          await fsPromises.unlink(oldPath);
        } catch {}
      }

      // ------------------ Update DB ------------------
      req.user.profilePicture = finalName;
      await req.user.save();

      res.status(200).json({
        message: "Profile picture updated",
        file: `/uploads/${finalName}`,
        stats,
      });
    } catch (err) {
      console.error("Upload error:", err);
      try {
        if (req.file?.path) await fsPromises.unlink(req.file.path);
      } catch {}
      res.status(500).json({ message: "Upload failed", error: err.message });
    }
  },
};

export default userController;
