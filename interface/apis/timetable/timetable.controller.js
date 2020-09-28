const httpStatus = require('http-status');

const timetableService = rootRequire('/core/application-services/timetable/timetable.service');

module.exports.findAll = async (req, res) => {
  const timetables = await timetableService.findAll();
  res.send(timetables);
}

module.exports.findById = async (req, res) => {
  const timetable = await timetableService.findById(req.params.id);
  if (!timetable)
    return res.status(httpStatus.NOT_FOUND).send({
      message: 'NOT_FOUND'
    });

  res.send(timetable);
}

module.exports.create = async (req, res) => {
  const timetable = await timetableService.create(req.body);
  res.send(timetable);
}