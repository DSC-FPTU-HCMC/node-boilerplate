const { User } = rootRequire('/externals/database').sequelize.models;

module.exports.findByUsername = async ({ username }) => {
  return User.findOne({ where: { username } });
}

module.exports.findById = async ({ id }) => {
  return User.findByPk(id);
}