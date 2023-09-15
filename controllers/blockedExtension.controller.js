const blockedExtensionService = require("../services/blockedExtension.service");

class BlockedExtensionController {

  // 차단된 확장자 확인
  getAllExtensions = async (req, res) => {
    try {
      // 이미 추가된 확장자를 조회하여 extension 변수에 저장
      const extension = await blockedExtensionService.getAllExtensions();
      res.status(200).json({ data: extension });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errMsg: "확장자 조회 실패." });
    }
  };

  // 차단할 확장자 추가
  addExtension = async (req, res) => {
    try {
      const { name } = req.body;
      // name 값이 없거나 영어 알파벳이 아닌 경우의 검사
      if (!name || !/^[A-Za-z]+$/.test(name)) {
        return res.status(400).json({
          errMsg: "차단할 확장자명 입력은 공백이나 영문 외에 허용되지않습니다.",
        });
      }
      const extension = await blockedExtensionService.addExtension(name);
      res.status(200).json({ data: extension});
    } catch (error) {
      if (error.message === "이미 등록된 확장자") {
        return res.status(400).json({ errMsg: error.message });
      }
      console.error(error);
      return res.status(500).json({ errMsg: "확장자 등록 실패." });
    }
  };

  // 차단된 확장자 취소
  deleteExtension = async (req, res) => {
    try {
      const { name } = req.params;
      if (!name) {
        return res.status(400).json({ errMsg: "값없음 : name" });
      }
      const deleteResult = await blockedExtensionService.deleteExtension(name);
      if (deleteResult) {
        return res.status(200).json({ msg: "삭제성공" });
      } else {
        return res.status(400).json({ errMsg: "삭제실패" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ errMsg: "전체에러" });
    }
  };
}

module.exports = new BlockedExtensionController();
