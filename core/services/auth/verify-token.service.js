const jwt = require('jsonwebtoken');

const {
  TOKEN_INVALID,
  TOKEN_VERIFIED
} = rootRequire('/core/constants/');

const { userRepository } = rootRequire('/externals/database/');

module.exports = ({ accessToken }) => new Promise((resolve) => {
  jwt.verify(accessToken, process.env.JWT_SECRET, async (err, decodedPayload) => {
    if (err)
      resolve({ message: TOKEN_INVALID });

    const user = await userRepository.findById({ id: decodedPayload.id });
    resolve({ message: TOKEN_VERIFIED, data: { user } });
  });
});