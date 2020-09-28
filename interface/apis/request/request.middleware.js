const status = require('http-status');
const { request } = require('express');

const requestMiddleware = {};

requestMiddleware.wirePreRequest = (req, res, next) => {
  const logger = req.logger;
  logger.info(`Handle ${req.method} request <---- ${req.url}`);
  next();
};

requestMiddleware.wirePostRequest = (err, req, res, next) => {
  const logger = req.logger;
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

global.setGlobalMiddleware(
  'interface.apis.request.requestMiddleware',
  requestMiddleware
);