const jwt = require('jsonwebtoken');

module.exports = ({ id, username }) => {
  const payloadToken = { id, username };

  return jwt.sign(payloadToken, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_EXPIRES)
  });
};