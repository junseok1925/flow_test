const express = require('express');
const router = express.Router();

const upload_file = require('../middlewares/s3Middleware.js');

const FileController = require('../controllers/file.controller');
const fileController = new FileController();

router.post('/upload_file', upload_file.single('file'), fileController.upload_file);
//                          upload.array('files', 10) -> 만약 파일을 한번에 여러개를 업로드하게 처리하고 싶으면 

module.exports = router;
