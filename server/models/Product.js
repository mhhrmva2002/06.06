const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

const Product = mongoose.model("Card", ProductSchema);

module.exports = Product;