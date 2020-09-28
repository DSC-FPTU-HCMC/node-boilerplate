const jwt = require('jsonwebtoken');
const { to } = require('await-to-js');
const status = require('http-status');

const authMiddleware = {};

authMiddleware.requireAuth = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    return res.redirect('/login');
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedPayload) => {
    if (err)
      return res.redirect('/login');

    req.user = await req.repos.Account.findById({ _id: decodedPayload._id });
    next();
  });
};

authMiddleware.requireRole = roles => async (req, res, next) => {
  const { Account } = req.repos;
  let accountRoles;
  if (!req.user) {
    [ err, accountRoles ] = await to(Account.findRolesById({ _id: req.user._id }));
    if (err) return next(err);
  } else {
    accountRoles = req.user.roles;
  }

  if (roles.some(role => accountRoles.includes(role)))
    return next();

  res.status(status.FORBIDDEN).send({
    success: false,
    message: 'You do not have permission to access this resource'
  });
};

global.setGlobalVariable(
  'interface.apis.authentication.authMiddleware',
  authMiddleware
);
