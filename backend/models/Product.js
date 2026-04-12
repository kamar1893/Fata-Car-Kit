const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, default: "" },
    description: { type: String, default: "" },
    countInStock: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    collection: "fata_products"
  }
);

module.exports = mongoose.model("FataProduct", productSchema);