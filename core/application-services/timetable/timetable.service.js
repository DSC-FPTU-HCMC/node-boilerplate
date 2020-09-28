const timetableRepository = rootRequire('/core/domain-services/timetable/timetable.repository');

module.exports.findAll = async () => {
  return timetableRepository.findAll();
}

module.exports.findById = async id => {
  return timetableRepository.findById(id);
}

module.exports.create = async timetable => {
  return timetableRepository.create(timetable);
}