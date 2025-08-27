import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import googleRouter from "./routes/googleRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// --- Security Middleware --- //
// Helmet: adds common security headers
app.use(
  helmet({
    contentSecurityPolicy: false, // disable CSP if frontend injects scripts (Next.js does)
  })
);

// CORS: allow Next.js frontend
const allowedOrigins = [
  "http://localhost:3000", // local frontend
  "http://localhost:3001",
  "http://localhost:3002", // in case frontend runs separately
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow no-origin requests (like curl or mobile apps)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true, // allow cookies/auth headers
  })
);

// Parse JSON
app.use(express.json());

// --- Routes --- //
app.use("/api/auth", authRouter);
app.use("/api/google", googleRouter);

// Root healthcheck
app.get("/", (req, res) => res.send("Server running"));

// --- Error Handling --- //
// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Handle global errors
app.use((err, req, res, next) => {
  console.error("Global error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// --- Start Server --- //
connectDB().then(() => {
  app.listen(port, () => console.log(`Server listening on ${port}`));
});

export default app;
