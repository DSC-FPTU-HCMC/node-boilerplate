'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Timetables',
      'place',
      Sequelize.STRING
    );
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Timetables', 'place');
  }
};
