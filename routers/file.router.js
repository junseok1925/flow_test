const express = require('express');
const router = express.Router();

const upload_file = require('../middlewares/s3Middleware.js');

const FileController = require('../controllers/file.controller');
const fileController = new FileController();

router.post('/upload_file', upload_file.single('file'), fileController.upload_file);

module.exports = router;
