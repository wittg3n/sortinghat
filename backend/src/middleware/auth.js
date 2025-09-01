import jwt from "jsonwebtoken";
import User from "../schema/User.js";

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "Missing auth header" });

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-__v");
    if (!req.user) return res.status(401).json({ error: "User not found" });
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
