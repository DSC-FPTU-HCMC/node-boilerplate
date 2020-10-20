const express = require('express');
const router = express.Router();

const signInValidator = require('./signin.validator');
const authController  = require('./auth.controller');

router.post('/signin', signInValidator, authController.postSignIn);

router.post('/signup', signInValidator, authController.postSignUp);

module.exports = router;