
global.rootRequire = module => require(__dirname + module);

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const co = require('co');

const apiRoute = rootRequire('/interface/apis/root/root.route');
const requestMiddleware = rootRequire('/interface/apis/request/request.middleware');
const { logger } = rootRequire('/configs/');
const sequelize = rootRequire('/database/');

let morganFormat = ':method :url :status :res[content-length] - :response-time ms';
if (process.env.NODE_ENV === 'production')
  morganFormat = 'combined';

process.on('uncaughtException', err => {
  console.error('Unhandled Exception', err);
});

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err);
});

co(function* () {
  const app = express();

  yield sequelize.authenticate();
  logger.info('Database connected!');

  app.use((req, res, next) => {
    // req.db = db;
    req.logger = logger;
    next();
  })

  app.use(cookieParser());
  app.use(helmet());
  app.use(morgan(morganFormat, { stream: logger.stream }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.static('public'));
  
  app.use(requestMiddleware.wirePreRequest);
  app.get('/', (req, res) => res.send('<h1>Developer Students Club - FPT University HCMC</h1>'));
  app.use('/api/', apiRoute);
  app.use(requestMiddleware.wirePostRequest);

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