const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection (cached)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

// Example route
app.get("/api/test", async (req, res) => {
  await connectDB();
  res.json({ message: "API is working" });
});

module.exports = app;