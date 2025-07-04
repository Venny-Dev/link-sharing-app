const multer = require("multer");
const AppError = require("./appError");

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5 MB
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new AppError("Only image files allowed"), false);
    }
    cb(null, true);
  },
});

module.exports = upload;
