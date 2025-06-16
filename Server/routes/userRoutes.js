const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const upload = require("../utils/multer");

const router = express.Router();

router.post("/signup", authController.signup);
router.get("/verify-email", authController.verifyEmail);

router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

router.patch(
  "/update-me",
  authController.protect,
  upload.single("photo"),
  userController.uploadPhoto,
  userController.updateMe
);

router.get("/get-user-details", authController.protect, userController.getUser);
router.get("/shared-profile", userController.getUser);

module.exports = router;
