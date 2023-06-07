const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(authController.getAllUsers);
router.route("/signup").post(authController.createUser);
router.route("/:id").delete(authController.deleteUser);
router.route("/:id").put(authController.updateUser);
router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logoutUser);

module.exports = router;