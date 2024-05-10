const express = require("express");
const multer = require('multer');
const dataController = require('../controllers/dataController');
const router = express.Router();

// Setup multer for file uploads
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

// Route to handle file upload for students data
router.post('/import/:dataType', upload.single('file'), dataController.importData);

module.exports = router;
