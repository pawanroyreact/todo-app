// Imports
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import todoRoutes from "./routes/todo.route.js";

// Basic Setup
const app = express();
dotenv.config();

// Middlewares
app.use("/api/todos", todoRoutes);
app.use(express.json());

// Start the server and connect Database
app.listen(5000, () => {
  connectDB();
  console.log("Server Started at Port:5000👍");
});
