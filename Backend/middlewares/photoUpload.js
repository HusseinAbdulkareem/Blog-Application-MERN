const path = require("path");
const multer = require("multer");
const fs = require("fs");

// Photo Storage
const photoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "..", "images");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // استخدام الوقت الحالي + امتداد الملف الأصلي لتجنب تكرار الأسماء
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

// Photo Upload middleware
const photoUpload = multer({
  storage: photoStorage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb({ message: "Unsupported file format" }, false);
    }
  },
  limits: { fileSize: 1024 * 1024 }, // 1 megabyte
});

module.exports = photoUpload;
