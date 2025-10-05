// models/Application.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
      index: true,
    },
    method: {
      type: String,
      enum: ["puppeteer", "browser_autofill", "manual"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "submitted", "failed"],
      default: "pending",
    },
    submittedAt: Date,
    logs: [
      {
        step: String,
        message: String,
        time: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

applicationSchema.index({ userId: 1, programId: 1 });

const Application = mongoose.model("Application", applicationSchema);
export default Application;
