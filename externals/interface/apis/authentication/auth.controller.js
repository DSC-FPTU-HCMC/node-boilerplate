'use strict';

const bcrypt = require('bcrypt');
const { to } = require('await-to-js');
const jwt = require('jsonwebtoken');
const status = require('http-status');

module.exports.postSignIn = async (req, res, next) => {
  const { Account } = req.repos;
  const { username, password } = req.body;

  try {
    const account = await Account.findByUsername({ username });

    if (!account)
      return res.status(status.OK)
        .send({
          success: false,
          message: 'Login failed',
          error: {
            username: 'Account doesn\'t exist!'
          }
        });

    const result = await bcrypt.compare(password, account.password);

    if (!result)
      return res.status(status.OK)
        .send({
          success: false,
          message: 'Login failed',
          error: {
            password: 'Password incorrect'
          }
        });

    res.cookie('token', generateJWT(account), { maxAge: process.env.COOKIE_EXP });

    res.status(status.OK)
      .send({
        success: true,
        message: 'Login successfully',
        error: null
      });
  } catch (err) {
    next(err);
  }
}

module.exports.postSignUp = async (req, res, next) => {
  const { Account } = req.repos;
  const { username, password } = req.body;

  const [ err0, existing ] = await to(Account.findByUsername({ username }));
  if (existing)
    return res.status(200).send({
      success: false,
      message: 'SignUp failed',
      error: {
        username: 'Account has already been taken!'
      }
    });

  const [ err1, account ] = await to(Account.create({ username, password }));
  if (err1) return next(err1);

  res.status(200).send({
    success: true,
    message: "Registered"
  });
}

/**private */
const generateJWT = ({ _id, username }) => {
  const payloadToken = { _id, username };

  return jwt.sign(payloadToken, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_EXPIRES)
  });
};