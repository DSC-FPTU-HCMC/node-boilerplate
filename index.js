/* eslint-disable */
process.on('uncaughtException', err => {
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message); // Displays the Date and Error Message.
  console.log(err); // Displays the Error;
  console.error(err.stack);  // Stack in Which the error occurred.
});

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err);
});
/* eslint-enable */

global.rootRequire = module => require(__dirname + module);

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const co = require('co');

const { openWebServiceInterface } = rootRequire('/externals/interface/');
const { sequelize } = rootRequire('/externals/database/');
const { logger } = rootRequire('/externals/logger/');

let morganFormat = ':method :url :status :res[content-length] - :response-time ms';
if (process.env.NODE_ENV === 'production')
  morganFormat = 'combined';

co(function* () {
  const app = express();
  yield sequelize.authenticate();
  logger.info('Database connected!');

  app.use((req, res, next) => {
    next();
  })

  app.use(cookieParser());
  app.use(helmet());
  app.use(morgan(morganFormat, { stream: logger.stream }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.static('public'));

  openWebServiceInterface(app);

  app.listen(process.env.PORT, () => {
    logger.info(`Server is now listening on PORT: ${process.env.PORT}`);
    logger.info(`Link: http://localhost:${process.env.PORT}`);
  });
})
.catch(err => {
  logger.error('The application could not start up!');
  logger.error(err.message);
  logger.error(err.stack);
});