// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import { parsePhoneNumberFromString } from "libphonenumber-js";

// ✅ زیر‌اسکیما برای OTP (با TTL خودکار)
const otpSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    purpose: { type: String, enum: ["phone", "email"], required: true },
    expiresAt: { type: Date, required: true, expires: 300 }, // حذف خودکار بعد از 5 دقیقه
    tries: { type: Number, default: 0 },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email address",
      },
    },

    emailVerified: { type: Boolean, default: false },

    phone: {
      type: String,
      index: true,
      validate: {
        validator: function (v) {
          if (!v) return true; // اختیاری بودن شماره
          const pn = parsePhoneNumberFromString(v);
          return pn ? pn.isValid() : false;
        },
        message: "Invalid phone number",
      },
    },

    phoneVerified: { type: Boolean, default: false },

    password: { type: String, required: true, minlength: 8 },

    profilePicture: { type: String },

    role: { type: String, enum: ["user", "admin"], default: "user" },

    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
    applications: [
      {
        program: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
        status: {
          type: String,
          enum: ["draft", "pending", "submitted", "accepted", "rejected"],
          default: "draft",
        },
        submittedAt: Date,
      },
    ],
    lastSeen: { type: Date, default: Date.now },

    otp: otpSchema,
  },
  { timestamps: true }
);

// 🧂 Hash password before save
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// 🔐 Password validation
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// 🧾 Hide sensitive fields in JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.otp;
  return obj;
};

// 🧠 Role-based helper
userSchema.methods.isAdmin = function () {
  return this.role === "admin";
};

// 📱 Virtual field: isVerified (email or phone)
userSchema.virtual("isVerified").get(function () {
  return this.emailVerified || this.phoneVerified;
});

// ⚙️ Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });

const User = mongoose.model("User", userSchema);
export default User;
