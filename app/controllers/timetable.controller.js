const { timetableRepository } = require('../repositories');
const httpStatus = require('http-status');

module.exports.findAll = async (req, res) => {
  const timetables = await timetableRepository.findAll();
  res.send(timetables);
}

module.exports.findById = async (req, res) => {
  const timetable = await timetableRepository.findById(req.params.id);
  if (!timetable)
    return res.status(httpStatus.NOT_FOUND).send({
      message: 'NOT_FOUND'
    });

  res.send(timetable);
}

module.exports.create = async (req, res) => {
  const timetable = await timetableRepository.create(req.body);
  res.send(timetable);
}