import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import passport from "passport";
import { connectDB } from "./config/db.js";
import "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import userUploadRoutes from "./routes/userUploadRoutes.js";
import path from "path";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Security
app.use(helmet({ contentSecurityPolicy: false }));

// CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

// Parse JSON
app.use(express.json());
app.use(cookieParser());

// Passport
app.use(passport.initialize());

// Routes
app.use("/api/v1/users", authRoutes);
app.use("/api/v1/user/upload/", userUploadRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// Root healthcheck
app.get("/", (req, res) => res.send("Server running"));

// Error Handling
app.use((req, res) => res.status(404).json({ error: "Not Found" }));
app.use((err, req, res, next) => {
  console.error("Global error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Retry DB connection
const MAX_RETRIES = 30;
const RETRY_DELAY = 2000;

async function startServer() {
  let attempts = 0;
  while (attempts < MAX_RETRIES) {
    try {
      attempts++;
      console.log(`Attempt ${attempts}/${MAX_RETRIES} to connect DB...`);
      await connectDB();
      console.log("✅ Database connected");
      app.listen(port, () =>
        console.log(`🚀 Server listening on http://localhost:${port}`)
      );
      return;
    } catch (err) {
      console.error(
        `❌ DB connection failed (attempt ${attempts})`,
        err.message
      );
      if (attempts >= MAX_RETRIES) process.exit(1);
      console.log(`⏳ Retrying in ${RETRY_DELAY / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }
}

startServer();

export default app;
