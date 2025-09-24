// src/seedAdmin.js
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// همیشه .env رو از پوشه بالاتر (backend/.env) بخونه
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./schema/User.js";

const MONGO_URI = process.env.MONGO_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

async function main() {
  if (!MONGO_URI) {
    console.error("MONGO_URI در فایل .env تنظیم نشده.");
    process.exit(1);
  }

  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
      console.log(
        `کاربر با ایمیل "${ADMIN_EMAIL}" از قبل وجود دارد. id: ${existing._id}`
      );
      await mongoose.disconnect();
      return;
    }

    const saltRounds = 12;
    const hash = await bcrypt.hash(ADMIN_PASSWORD, saltRounds);

    const adminUser = new User({
      email: ADMIN_EMAIL,
      password: hash,
      name: "admin",
    });

    await adminUser.save();
    console.log("کاربر admin ساخته شد:", {
      email: ADMIN_EMAIL,
      id: adminUser._id,
    });
  } catch (err) {
    console.error("خطا هنگام ایجاد admin:", err);
  } finally {
    await mongoose.disconnect();
  }
}

main();
