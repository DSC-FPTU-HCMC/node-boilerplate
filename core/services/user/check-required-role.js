const {
  FORBIDDEN,
  RESOURCE_ACCESSIBLE
} = rootRequire('/core/constants/');

const { userRepository } = rootRequire('/externals/database/');

module.exports = async ({ id, requiredRoles }) => {
  const userRoles = userRepository.findRolesById({ id });
  if (requiredRoles.some(role => userRoles.includes(role)))
    return { message: FORBIDDEN };
  else
    return { message: RESOURCE_ACCESSIBLE };
}