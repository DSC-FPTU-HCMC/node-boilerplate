const status = require('http-status');

const {
  TOKEN_REQUIRED,
  TOKEN_INVALID,
  FORBIDDEN
} = rootRequire('/core/constants/');

const { authService, userService } = rootRequire('/core/services/');

module.exports.requireAuth = async (req, res, next) => {
  const authorizationHeader = req.headers['Authorization'];
  const accessToken = authorizationHeader && authorizationHeader.split('Bearer ')[1];
  if (!accessToken)
    return res.end({ message: TOKEN_REQUIRED });

  const result = await authService.verifyToken({ accessToken });
  if (result.message === TOKEN_INVALID) 
    return res.end(result);

  req.user = result.data.user;
  next();
};

module.exports.requireRole = requiredRoles => async (req, res, next) => {
  const result = await userService.checkRequiredRole({ id: req.user.id, requiredRoles });

  if (result.message === FORBIDDEN)
    return res.status(status.FORBIDDEN).send(result);

  next();
};