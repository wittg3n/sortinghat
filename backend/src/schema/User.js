// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const otpSchema = new mongoose.Schema({
  code: String,
  purpose: { type: String, enum: ["phone", "email"] },
  expiresAt: Date,
  tries: { type: Number, default: 0 },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: "Invalid email address",
      },
    },
    emailVerified: { type: Boolean, default: false },
    phone: {
      type: String,
      index: true,
      validate: {
        validator: function (v) {
          if (!v) return true;
          const pn = parsePhoneNumberFromString(v);
          return pn ? pn.isValid() : false;
        },
        message: "Invalid phone number",
      },
    },
    phoneVerified: { type: Boolean, default: false },
    password: { type: String, required: true },
    profilePicture: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
    suggestions: [
      {
        universityId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "University",
        },
        score: Number,
        createdAt: { type: Date, default: Date.now },
        source: String,
      },
    ],
    lastSeen: { type: Date, default: Date.now },
    otp: otpSchema,
  },
  { timestamps: true }
);

// Hash password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
