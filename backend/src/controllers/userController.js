import jwt from "jsonwebtoken";
import User from "../schema/User.js";

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
      await newUser.save();

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
};

export default userController;
