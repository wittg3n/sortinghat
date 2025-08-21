import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import googleRouter from "./routes/googleRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/google", googleRouter);

app.get("/", (req, res) => res.send("Server running"));

connectDB().then(() => {
  app.listen(port, () => console.log(`Server listening on ${port}`));
});
// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});
// Handle global errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
// Export app for testing
export default app;
// This allows us to import the app in tests or other modules
// without starting the server immediately, which is useful for unit tests.
