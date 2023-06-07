const Slide = require("../models/Slide");
const fs = require("fs");
const path = require("path");

const parentPath = path.join(__dirname, "..");
exports.createSlide = async (req, res) => {
  try {
    const { name } = req.body;
    const slide = await Slide.create({
      name,
      image: req.file.filename,
    });
    res.status(201).json(slide);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.getAllSlides = async (req, res) => {
  try {
    const Slides = await Slide.find();
    res.status(200).json(Slides);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.deleteSlide = async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id);
    let deletedImage = parentPath + "/uploads/" + slide.image;
    fs.unlink(deletedImage, async (err) => {
      if (err) {
        console.error("Error deleting image:", err);
      } else {
        await Slide.findOneAndDelete({ _id: req.params.id });
        res.status(200).send("Slide has been deleted");
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.updateSlide = async (req, res) => {
  try {
    const { name } = req.body;
    const slide = await Slide.findOne({ _id: req.params.id });
    slide.name = name;
    slide.image = req.file.filename;
    slide.save();
    res.status(200).json({
      updated: true,
      slide,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};