const express = require("express");
const upload = require("../middlewares/uploadMiddleware");
const slideController = require("../controllers/slideController");

const router = express.Router();

router.route("/").get(slideController.getAllSlides);
router.route("/").post(upload.single("imageFile"), slideController.createSlide);
router
  .route("/:id")
  .put(upload.single("imageFile"),slideController.updateSlide);
router.route("/:id").delete(slideController.deleteSlide);

module.exports = router;