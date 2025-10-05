// models/Log.js
import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true }, // e.g. login, upload, apply, ai_predict
    level: {
      type: String,
      enum: ["info", "warning", "error"],
      default: "info",
    },
    details: mongoose.Schema.Types.Mixed,
    ip: String,
    userAgent: String,
  },
  { timestamps: true }
);

logSchema.index({ userId: 1, action: 1 });
logSchema.index({ createdAt: -1 });

const Log = mongoose.model("Log", logSchema);
export default Log;
