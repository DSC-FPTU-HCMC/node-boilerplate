const status = require('http-status');

const { logger } = rootRequire('/externals/logger/');

module.exports.wirePreRequest = (req, res, next) => {
  logger.info(`Handle ${req.method} request <---- ${req.url}`);
  next();
};

module.exports.wirePostRequest = (err, req, res, next) => {
  if (!err) return next();

  if (err && err.error && err.error.isJoi) {
    return res.status(200).send({
      message: 'ValidationError',
      type: err.type,
      error: err.error,
      fields: err.error.details.map(d => d.context.label)
    });
  }

  logger.error(`ERROR :{} ${status.BAD_GATEWAY} ${err.message}`);
  logger.error(err.stack);

  res.status(status.BAD_GATEWAY).send({
    success: false,
    status: status.BAD_GATEWAY,
    message: err.message,
    error: {
      message: err.message,
      stack: err.stack
    }
  });
}