class FileController {
  upload_file = async (req, res) => {
    const fileUrl = req.file_url;
    if (fileUrl) {
      return res.status(200).json({ data: fileUrl });
    } else {
      return res.status(400).json({ errMsg: '파일 업로드 실패' });
    }
  };
}

module.exports = FileController;
