'use strict';

const status = require('http-status');

const { authService } = rootRequire('/core/services/');

module.exports.postSignIn = async (req, res) => {
  const result = await authService.signIn({
    username: req.body.username,
    password: req.body.password
  });
  res.status(status.OK).send(result);
}

module.exports.postSignUp = async (req, res) => {
  const result = await authService.signUp({
    username: req.body.username,
    password: req.body.password
  });
  res.status(status.OK).send(result);
}