'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = sequelize => {
  class Timetable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Timetable.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    place: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Timetable',
  });
  return Timetable;
};