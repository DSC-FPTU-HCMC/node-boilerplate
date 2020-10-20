const {
  USERNAME_TAKEN,
  SIGNED_UP,
  DATABASE_DOWN
} = rootRequire('/core/constants');

const { userRepository } = rootRequire('/externals/database');
const { logger } = rootRequire('/externals/logger');

module.exports = async ({ username, password }) => {
  try {
    const existing = await userRepository.findByUsername({ username });
    if (existing)
      return { message: USERNAME_TAKEN };

    const user = await userRepository.create({ username, password });
    return { message: SIGNED_UP, data: user };
  } catch (err) {
    logger.error(`An error occurpied when signing user in (username = ${username})`);
    logger.error(err.message);
    logger.error(err.trace);
    return { message: DATABASE_DOWN }
  }
}