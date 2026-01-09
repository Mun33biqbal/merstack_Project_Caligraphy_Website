const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { auth, admin } = require("../middleware/auth");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", auth, admin, upload.single("image"), async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const product = new Product({
      title,
      description,
      price,
      category,
      image,
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
