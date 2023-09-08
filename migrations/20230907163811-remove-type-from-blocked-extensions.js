'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('BlockedExtensions', 'type');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('BlockedExtensions', 'type', {
      type: Sequelize.ENUM('fixed', 'custom'),
      allowNull: false
    });
  }
};
