const express = require("express");
const Order = require("../models/Order");
const { auth, admin } = require("../middleware/auth");

const router = express.Router();

// CREATE ORDER
router.post("/", auth, async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user._id,
      ...req.body,
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL ORDERS (admin only)
router.get("/", auth, admin, async (req, res) => {
  try {
    const orders = await Order.find().populate("user");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
