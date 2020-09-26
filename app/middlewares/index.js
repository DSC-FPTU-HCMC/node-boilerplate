const authMiddleware = require('./auth.middleware');
const requestMiddleware = require('./request.middleware');

module.exports = {
  authMiddleware,
  requestMiddleware
};