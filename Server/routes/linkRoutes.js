const express = require("express");
const linkController = require("../controllers/linkController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(authController.protect, linkController.updateLinks)
  .get(authController.protect, linkController.getLinks);

module.exports = router;
