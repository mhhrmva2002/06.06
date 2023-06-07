const Category = require("../models/Category");
const Card = require("../models/Product");

exports.getAllCategories = async (req, res) => {
  try {
    const Categories = await Category.find();
    res.status(200).json(Categories);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findOneAndRemove({ _id: req.params.id });
    await Product.deleteMany({ category: req.params.id });
    res.status(200).send("Category has been deleted");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findOne({ _id: req.params.id });
    category.name = name;
    category.save();
    res.status(200).json({
      updated: true,
      category,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};