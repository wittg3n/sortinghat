// models/Document.js
import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["CV", "Transcript", "LanguageCert", "Recommendation", "Other"],
      required: true,
    },
    filename: { type: String, required: true },
    fileUrl: { type: String, required: true },
    size: Number, // optional: in bytes
    mimetype: String,
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

documentSchema.index({ userId: 1, type: 1 });

const Document = mongoose.model("Document", documentSchema);
export default Document;
