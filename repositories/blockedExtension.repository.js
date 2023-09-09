const {BlockedExtension} = require('../models');

class BlockedExtensionRepository {

  getAll = async () => {
    try {
      return await BlockedExtension.findAll({});
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  getOne = async (name) => {
    try {
      return await BlockedExtension.findOne({ where: { name } });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  add = async (name) => {
    try {
      return await BlockedExtension.create({
        name,
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  delete = async (name) => {
    try {
      return await BlockedExtension.destroy({ where: { name } });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}

module.exports = new BlockedExtensionRepository();
