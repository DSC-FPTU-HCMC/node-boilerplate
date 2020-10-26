const httpStatus = require('http-status');

const { timetableService } = rootRequire('/core/services/');

module.exports.findAll = async (req, res) => {
  const result = await timetableService.findAll();
  res.send(result);
}

module.exports.findById = async (req, res) => {
  const result = await timetableService.findById({ id: req.params.id });
  if (!result)
    return res.status(httpStatus.NOT_FOUND).send({
      message: 'NOT_FOUND'
    });

  res.send(result);
}

module.exports.create = async (req, res) => {
  const result = await timetableService.create(req.body);
  res.send(result);
}