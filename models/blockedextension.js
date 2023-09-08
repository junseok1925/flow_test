'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlockedExtension extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BlockedExtension.init({
    name: DataTypes.STRING,
    addedDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'BlockedExtension',
  });
  return BlockedExtension;
};