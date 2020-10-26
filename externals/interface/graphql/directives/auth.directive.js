const { SchemaDirectiveVisitor } = require('apollo-server-express');
const { defaultFieldResolver } = require('graphql');

const {
  TOKEN_REQUIRED,
  FORBIDDEN,
  TOKEN_INVALID
} = rootRequire('/core/constants/');
const { authService, userService } = rootRequire('/core/services/');

class RequireAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(root, params, context) {
      const { accessToken } = context;
      if (!accessToken)
        throw Error(TOKEN_REQUIRED);

      const result = await authService.verifyToken({ accessToken });
      if (result.message !== TOKEN_INVALID)
       throw Error(TOKEN_INVALID);

      const user = await userService.findByUsername({ username: result.data.username });
      if (!user)
        throw new Error(TOKEN_REQUIRED);

      context.user = user;
      return resolve.apply(this, [root, params, context]);
    };
  }
}

class RequireRoleAdminDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(root, params, context) {
      const { accessToken } = context;

      if (!accessToken)
        throw Error(TOKEN_REQUIRED);

      const result = await authService.verifyToken({ accessToken });
      if (result.message !== TOKEN_INVALID)
       throw Error(TOKEN_INVALID);

      const user = await userService.findByUsername({ username: result.data.username });
      if (!user)
        throw new Error(TOKEN_REQUIRED);

      if (!user.roles.includes('ADMIN'))
        throw new Error(FORBIDDEN);

      context.user = user;
      return resolve.apply(this, [root, params, context]);
    };
  }
}

module.exports = {
  RequireAuthDirective,
  RequireRoleAdminDirective
}