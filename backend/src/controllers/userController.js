import jwt from "jsonwebtoken";
import User from "../schema/User.js";

const generateToken = (user) =>
  jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

const userController = {
  signup: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "Email exists" });

      const newUser = new User({ name, email, password });
      await newUser.save();

      const token = generateToken(newUser);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(201).json({ message: "User created", token });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },

  login: async (req, res) => {
    const token = generateToken(req.user);
    console.log(token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged in successfully", token });
  },

  getProfile: (req, res) => {
    console.log("yo");
    res.status(200).json({
      name: req.user.name,
      email: req.user.email,
      profilePicture: req.user.profilePicture
        ? `/uploads/${req.user.profilePicture}`
        : null,
    });
  },

  updateProfilePicture: async (req, res) => {
    try {
      if (!req.file)
        return res.status(400).json({ message: "No file uploaded" });

      req.user.profilePicture = req.file.filename;
      await req.user.save();

      res.status(200).json({ message: "Profile picture updated" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },

  logout: (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  },
  isLoggedIn: (req, res) => {
    res.status(200).json({ message: "logged in before" });
  },
  tokenValidator: (req, res) => {
    const { token } = req.body;
    console.log("ur in token-validator route");
    if (!token) {
      return res
        .status(400)
        .json({ valid: false, message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      return res.status(200).json({
        valid: true,
        user: decoded, // send decoded info (id, email)
      });
    } catch (err) {
      return res.status(401).json({
        valid: false,
        message: "Invalid or expired token",
      });
    }
  },
};

export default userController;
