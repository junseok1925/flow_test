const {BlockedExtension} = require('../models');

class BlockedExtensionRepository {

  getAll = async () => {
    try {
      return await BlockedExtension.findAll({});
    } catch (err) {
      console.error("추가한 확장자명 조회에 실패", err);
      throw new Error('확장자 목록을 가져오는데 실패했습니다.');
    }
  };

  getOne = async (name) => {
    try {
      return await BlockedExtension.findOne({ where: { name } });
    } catch (err) {
      console.error(`${name} 확장자를 조회에 실패(getOne) :`, err);
      throw new Error('특정 확장자를 가져오는데 실패했습니다.');
    }
  };

  add = async (name) => {
    try {
      return await BlockedExtension.create({
        name,
      });
    } catch (err) {
      console.error(`${name} 으로 확장자 추가 실패(add) :`, err);
      throw new Error('확장자를 추가하는데 실패했습니다.');
    }
  };

  delete = async (name) => {
    try {
      return await BlockedExtension.destroy({ where: { name } });
    } catch (err) {
      console.error(`${name} 으로 확장자 삭제 실패(delete) :`, err);
      throw new Error('확장자를 삭제하는데 실패했습니다.');
    }
  };
}

module.exports = new BlockedExtensionRepository();
