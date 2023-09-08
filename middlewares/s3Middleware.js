const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3-transform");
const path = require("path");
const blockedExtensionService = require('../services/blockedExtension.service');
require("dotenv").config();

// AWS S3 설정
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const getToDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
};

const getRandomNum = () => {
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += String(Math.floor(Math.random() * 10));
  }
  return result;
};

const checkFileExtension = async (req, file, cb) => {
    const fileExt = path.extname(file.originalname).toLowerCase().substring(1); // .을 제거합니다.
    const isBlocked = await blockedExtensionService.getOneExtension(fileExt);

    if (isBlocked) {
        cb(new Error('이 확장자는 업로드할 수 없습니다.'), false);
    } else {
        cb(null, true);
    }
};

const upload_file = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, callback) => {
            const today = getToDate();
            const randomNum = getRandomNum();
            const extension = path.extname(file.originalname).toLowerCase();
            const nameWithoutExtension = path.basename(file.originalname, extension);

            const newFileName = `${nameWithoutExtension}_${today}_${randomNum}${extension}`;

            const file_url = `https://${process.env.AWS_BUCKET}.s3.ap-northeast-2.amazonaws.com/files/${newFileName}`;

            req.file_url = req.file_url || [];
            req.file_url.push(file_url);
            callback(null, `files/${newFileName}`);
        },
    }),
    fileFilter: checkFileExtension,
});

module.exports = upload_file;
