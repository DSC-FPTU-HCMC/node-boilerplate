const { RequireAuthDirective, RequireRoleAdminDirective } = require('./auth.directive');

module.exports = {
  requireAuth: RequireAuthDirective,
  requireRoleAdmin: RequireRoleAdminDirective
};