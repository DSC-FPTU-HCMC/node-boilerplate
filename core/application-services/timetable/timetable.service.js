const { timetableRepository } = rootRequire('/externals/database/');

module.exports.findAll = async () => {
  return timetableRepository.findAll();
}

module.exports.findById = async id => {
  return timetableRepository.findById(id);
}

module.exports.create = async timetable => {
  return timetableRepository.create(timetable);
}