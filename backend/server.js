// Imports
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// Basic Setup
const app = express();
dotenv.config();

// Middlewares

// Routes
app.get("/", (req, res) => {
  res.send("server is ready👌");
});

// Start the server and connect Database
app.listen(5000, () => {
  connectDB();
  console.log("Server Started at Port:5000👍");
});
