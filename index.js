const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const apiRoute = require('./app/routes/');
const { requestMiddleware } = require('./app/middlewares/');
const { logger } = require('./config/');

let morganFormat = ':method :url :status :res[content-length] - :response-time ms';
if (process.env.NODE_ENV === 'production')
  morganFormat = 'combined';

process.on('uncaughtException', err => {
  console.error('Unhandled Exception', err);
});

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err);
});

const app = express();

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

const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`Server is now listening on PORT: ${PORT}`);
  logger.info(`Link: http://localhost:${PORT}`);
});