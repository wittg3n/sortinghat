// models/UserSelection.js
import mongoose from "mongoose";

const userSelectionSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["confirmed", "rejected", "edited"],
      default: "confirmed",
    },
    note: String, // optional user comment
  },
  { timestamps: true }
);

userSelectionSchema.index({ userId: 1, programId: 1 }, { unique: true });

const UserSelection = mongoose.model("UserSelection", userSelectionSchema);
export default UserSelection;
