const multer = require('multer');

const storage = multer.diskStorage({
	// Kelayotgan filelar qayerga tushishini belgilash
	destination: (req, file, cb) => {
		cb(null, "uploads/"); // uploads folderga tushadi
	},
	// Kelayotgan filega unique nom berish
	filename: (req, file, cb) => {
		cb(null, Date.now() + "_" + file.originalname)
	},
})

const upload = multer({ storage });

const uploadMiddleware = upload.single("photo");

module.exports = uploadMiddleware;