const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    // In serverless environments (Vercel), don't exit the process on DB failure.
    // Log the error and allow the function to handle connection errors per-request.
  }
};

module.exports = connectDB;
