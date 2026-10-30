// Imports
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import todoRoutes from "./routes/todo.route.js";
// import cors from "cors";
import path from "path";

// Basic Setup
const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
// app.use(cors());
app.use("/api/todos", todoRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Start the server and connect Database
app.listen(5000, () => {
  connectDB();
  console.log("Server Started at Port:5000👍");
});
