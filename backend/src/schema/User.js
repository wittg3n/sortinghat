// /backend/schema/user.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional for Google users
  googleId: { type: String }, // unique Google ID
  googleTokens: { type: Object }, // Gmail tokens if connected
});

export default mongoose.model("User", userSchema);
