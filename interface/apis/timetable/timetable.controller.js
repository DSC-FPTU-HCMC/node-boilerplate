const timetableService = global['core.application-services.timetableService'];
const httpStatus = require('http-status');

const timetableController = {};

timetableController.findAll = async (req, res) => {
  const timetables = await timetableService.findAll();
  res.send(timetables);
}

timetableController.findById = async (req, res) => {
  const timetable = await timetableService.findById(req.params.id);
  if (!timetable)
    return res.status(httpStatus.NOT_FOUND).send({
      message: 'NOT_FOUND'
    });

  res.send(timetable);
}

timetableController.create = async (req, res) => {
  const timetable = await timetableService.create(req.body);
  res.send(timetable);
}

global.setGlobalVariable(
  'interface.apis.authentication.timetableController',
  timetableController
);