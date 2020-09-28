const timetableRepository = global['core.domain-services.timetableRepository'];

const timetableService = {};

timetableService.findAll = async () => {
  return timetableRepository.findAll();
}

timetableService.findById = async id => {
  return timetableRepository.findById(id);
}

timetableService.create = async timetable => {
  return timetableRepository.create(timetable);
}

global.setGlobalVariable(
  'core.application-services.timetableRepository',
  timetableService
);