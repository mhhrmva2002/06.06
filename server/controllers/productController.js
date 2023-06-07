const fs = require("fs");
const path = require("path");

const Product = require("../models/Product");
const User = require("../models/User");
const parentPath = path.join(__dirname, "..");

exports.getAllProducts = async (req, res) => {
  try {
    const Products = await Product.find();
    res.status(200).json(Products);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.createProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const product = await Product.create({
      name,
      price,
      category,
      image: req.file.filename,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    let deletedImage = parentPath + "/uploads/" + product.image;
    fs.unlink(deletedImage, async (err) => {
      if (err) {
        console.error("Error deleting image:", err);
      } else {
        await Product.findOneAndDelete({ _id: req.params.id });
        res.status(200).send("Product has been deleted");
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const product = await Product.findOne({ _id: req.params.id });
    console.log(product);
    product.name = name;
    product.image = req.file.filename;
    product.price = price;
    product.category = category;
    product.save();
    res.status(200).json({
      updated: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.addToProduct = async (req, res) => {
  try {
    const user = await User.findById(userIN);
    await user.product.addToSet(req.body);
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.removeFromProduct = async (req, res) => {
  try {
    const user = await User.findById(userIN);
    await user.product.pull({ _id: req.params.id });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};