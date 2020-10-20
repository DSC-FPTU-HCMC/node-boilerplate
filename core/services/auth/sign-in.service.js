const bcrypt = require('bcrypt');

const {
  USERNAME_NOT_FOUND,
  PASSWORD_INCORRECT,
  SIGNED_IN,
  DATABASE_DOWN
} = rootRequire('/core/constants/auth.constant');
const { signJWT } = rootRequire('/core/utils');

const { userRepository } = rootRequire('/externals/database');
const { logger } = rootRequire('/externals/logger');

module.exports = async ({ username, password }) => {
  try {
    const user = await userRepository.findByUsername({ username });
    if (!user)
      return { message: USERNAME_NOT_FOUND };

    const result = await bcrypt.compare(password, user.password);
    if (!result)
      return { message: PASSWORD_INCORRECT };

    return {
      message: SIGNED_IN,
      data: {
        user: {
          username: user.username,
          email: user.email
        },
        token: signJWT(user)
      }
    };
  } catch (err) {
    logger.error(`An error occurpied when signing user in (username = ${username})`);
    logger.error(err.message);
    logger.error(err.trace);
    return { message: DATABASE_DOWN };
  }
}