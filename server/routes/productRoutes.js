const express = require("express");
const upload = require("../middlewares/uploadMiddleware");
const cardController = require("../controllers/productController");

const router = express.Router();

router.route("/").get(productController.getAllProducts);
router.route("/").post(upload.single("imageFile"), productController.createProduct);
router.route("/:id").delete(productController.deleteProduct);
router.route("/:id").put(upload.single("imageFile"), productController.updateProduct);
router.route("/addProduct/:id").post(productController.addToProduct);
router.route("/removeProduct/:id").post(productController.removeFromProduct);

module.exports = router;