const blockedExtensionRepository = require("../repositories/blockedExtension.repository");

class BlockedExtensionService {
  getAllExtensions = async () => {
    return await blockedExtensionRepository.getAll();
  };

  addExtension = async (name) => {
    const existingExtension = await blockedExtensionRepository.getOne(name);
    if (existingExtension) {
      throw new Error('이미 등록된 확장자');
    }
    return await blockedExtensionRepository.add(name);
  };

  getOneExtension = async (name) => {
    return await blockedExtensionRepository.getOne(name);
  };

  deleteExtension = async (id) => {
    return await blockedExtensionRepository.delete(id);
  };
}

module.exports = new BlockedExtensionService();
