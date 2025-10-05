// models/Prediction.js
import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
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
    suggestions: [
      {
        program: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
        score: Number,
        createdAt: { type: Date, default: Date.now },
        source: String,
      },
    ],
    probability: { type: Number, required: true, min: 0, max: 1 },
    suggestedRank: { type: Number },
    aiModelVersion: { type: String, default: "v1" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

predictionSchema.index({ userId: 1, programId: 1 }, { unique: true });

const Prediction = mongoose.model("Prediction", predictionSchema);
export default Prediction;
