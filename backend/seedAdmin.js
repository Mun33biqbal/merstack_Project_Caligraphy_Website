const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  await connectDB();

  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await User.findOneAndUpdate(
    { email: "admin@calligraphy.com" },
    {
      name: "Admin",
      email: "admin@calligraphy.com",
      password: hashedPassword,
      isAdmin: true,
    },
    { upsert: true, new: true }
  );

  console.log("Admin user created/updated:", admin.email);
  process.exit();
};

seedAdmin();