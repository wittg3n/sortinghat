// models/University.js
import mongoose from "mongoose";

const universitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    country: { type: String, required: true },
    city: { type: String },
    website: { type: String },
    logo: { type: String },
    programs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Program" }],
    loginType: {
      type: String,
      enum: ["SSO", "Normal", "Captcha", "Unknown"],
      default: "Unknown",
    },
    ranking: Number,
  },
  { timestamps: true }
);

universitySchema.index({ country: 1, name: 1 });

const University = mongoose.model("University", universitySchema);
export default University;
