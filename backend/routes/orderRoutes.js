const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Create order
router.post("/", async (req, res) => {
  try {
    const { user, items, totalPrice, shippingAddress, phone } = req.body;

    if (!user || !items || items.length === 0 || !totalPrice || !shippingAddress || !phone) {
      return res.status(400).json({ message: "Missing order data" });
    }

    const order = await Order.create({
      user,
      items,
      totalPrice,
      shippingAddress,
      phone,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;