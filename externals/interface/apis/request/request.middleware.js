const status = require('http-status');

const {
  VALIDATION_FAILED,
  SERVER_ERROR,
  FILE_UPLOAD_INVALID_MIMETYPE
} = rootRequire('/core/constants');

const { logger } = rootRequire('/externals/logger/');

module.exports.wirePreRequest = (req, res, next) => {
  logger.info(`Handle ${req.method} request <---- ${req.url}`);
  next();
};

module.exports.wirePostRequest = (err, req, res, next) => {
  if (!err) return next();

  if (err && err.error && err.error.isJoi) {
    return res.status(status.OK).send({
      message: VALIDATION_FAILED,
      type: err.type,
      error: err.error,
      fields: err.error.details.map(d => d.context.label)
    });
  }

  logger.error(`ERROR :{} ${err.message}`);
  if (err.code === 'LIMIT_UNEXPECTED_FILE')
    logger.error(`This is the invalid field -> ${err.field}`);
  logger.error(err.stack);

  if (err.message.includes('FILE_UPLOAD: mimetype'))
    return res.status(status.OK).send({
      message: FILE_UPLOAD_INVALID_MIMETYPE
    });

  res.status(status.OK).send({
    message: SERVER_ERROR,
    error: {
      message: err.message,
      stack: err.stack
    }
  });
}