const { Timetable } = require('../../../database').models;

const timetableRepository = {};

timetableRepository.findAll = async () => {
  return Timetable.findAll();
}

timetableRepository.findById = async id => {
  return Timetable.findByPk(id);
}

timetableRepository.create = async timetable => {
  return Timetable.create(timetable);
}

global.setGlobalVariable(
  'core.domain-services.timetableRepository',
  timetableRepository
);