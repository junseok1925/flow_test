const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3-transform");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const blockedExtensionService = require("../services/blockedExtension.service");
require("dotenv").config();

// AWS S3 설정
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const getToDate = () => {
  const now = new Date(); //현재 날짜, 시간을 사용해서 파일 이름에 사용될 날짜,시간 문자열 생성하기
  return `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
};

// 업로드할 파일의 확장자를 확인해서 차단한 확장자인지 확인한다.
const checkFileExtension = async (req, file, cb) => {
  // 업로드할 파일의 확장자를 추출, .substring(1)으로 확장자명 앞에 "."을 제거 후 소문자로 변환
  const fileExt = path.extname(file.originalname).toLowerCase().substring(1);
  // 추출한 확장자명으로 db에 차단확장자명을 추출
  const isBlocked = await blockedExtensionService.getOneExtension(fileExt);
  // db에 추출한 확장자명과 같은 확장자명이 있다면...
  if (isBlocked) {
    // 콜백함수 cb를 호출 첫번째 인자는 오류 메시지를 포함함 "Error"객체를 전달 후 두번째 인자로 "false"를 전달하여 업로드를 중단
    cb(new Error("이 확장자는 업로드할 수 없습니다."), false);
  } else {
    // 콜백함수 cb를 호출 첫번째 인자는 "null" 전달 하여 오류가 없음을 나타낸 후 두번째 인자로 "true"를 전달하여 업로드를 허용한다
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
      const uniqueID = uuidv4(); // uuidv4 라이브러리 사용 : 전역적으로 완전히 고유한 ID를 생성
      const extension = path.extname(file.originalname).toLowerCase(); // 업로드된 파일의 확장자를 추출
      const nameWithoutExtension = path.basename(file.originalname, extension); // 확장자를 제외한 원본 파일 이름을 추출

      const newFileName = `${nameWithoutExtension}_${today}_${uniqueID}${extension}`; // 새로운 파일 이름 생성 : 확장자+날짜+고유ID를 조합하여 생성된다

      const file_url = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_ENDPOINT_REGION}.amazonaws.com/files/${newFileName}`; // 업로드된 파일의 URL를 생성

      req.file_url = req.file_url || []; // req 요청객체에 "file_url"이 이미 존재하는지 확인 존재하지 않다면 []빈배열로 초기화, 이렇게하면 요청객체에 "file_url"을 배열로 관리가능
      req.file_url.push(file_url); // "file_url"을 요청 객체 배열에 추가
      // 여러개의 파일을 업로드하게 될 경우 각 파일의 file_url를 클라이언트에게 전달하기 위해 req요청에 배열로 저장하게된다
      callback(null, `files/${newFileName}`); // AWS S3에 저장될 경로를 지정 "files"라는 경로 안에 저장하라
    },
  }),
  fileFilter: checkFileExtension, // "checkFileExtension" 함수를 사용하여 파일 업로드 전에 확장자를 확인한다.
});

module.exports = upload_file;
