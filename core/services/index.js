module.exports.authService = {
  signIn: require('./auth/sign-in.service'),
  signUp: require('./auth/sign-up.service'),
  verifyToken: require('./auth/verify-token.service'),
  signJWT: require('./auth/sign-jwt.service')
}

module.exports.timetableService = require('./timetable/timetable.service');

module.exports.userService = {
  checkRequiredRole: require('./user/check-required-role')
}