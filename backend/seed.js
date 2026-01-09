const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

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

const seedProducts = async () => {
  await connectDB();

  const products = [
    {
      title: "Elegant Arabic Calligraphy",
      description: "Beautiful hand-drawn Arabic script on parchment.",
      price: 75,
      image: "https://via.placeholder.com/200x150?text=Arabic+Calligraphy",
      category: "Arabic",
    },
    {
      title: "Modern Brush Lettering",
      description: "Contemporary calligraphy with brush strokes.",
      price: 50,
      image: "https://via.placeholder.com/200x150?text=Brush+Lettering",
      category: "Modern",
    },
    {
      title: "Vintage Copperplate",
      description: "Classic copperplate style calligraphy.",
      price: 60,
      image: "https://via.placeholder.com/200x150?text=Copperplate",
      category: "Classic",
    },
  ];

  await Product.insertMany(products);
  console.log("Products seeded");
  process.exit();
};

seedProducts();