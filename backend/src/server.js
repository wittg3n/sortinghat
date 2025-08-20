import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Auth routes
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Express server is running!");
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

process.on("SIGINT", async () => {
  console.log("Server shutting down...");
  await (await import("mongoose")).connection.close();
  process.exit(0);
});
