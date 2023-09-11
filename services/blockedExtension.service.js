const blockedExtensionRepository = require("../repositories/blockedExtension.repository");
class BlockedExtensionService {
  getAllExtensions = async () => {
    try {
      return await blockedExtensionRepository.getAll();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  addExtension = async (name) => {
    try {
      const existingExtension = await blockedExtensionRepository.getOne(name);
      if (existingExtension) {
        throw new Error("이미 등록된 확장자");
      }
      return await blockedExtensionRepository.add(name);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  getOneExtension = async (name) => {
    try {
      return await blockedExtensionRepository.getOne(name);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  deleteExtension = async (name) => {
    try {
      const extension = await this.getOneExtension(name);
      if (!extension) {
        throw new Error("해당 확장자가 존재하지 않습니다.");
      }
      return await blockedExtensionRepository.delete(name);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}

module.exports = new BlockedExtensionService();
