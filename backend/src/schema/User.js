import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleTokens: { type: Object }, // store access & refresh tokens
});

export default mongoose.model("User", userSchema);
