const { Timetable } = rootRequire('/externals/database').sequelize.models;

module.exports.findAll = async () => {
  return Timetable.findAll();
}

module.exports.findById = async ({ id }) => {
  return Timetable.findByPk(id);
}

module.exports.create = async timetable => {
  return Timetable.create(timetable);
}