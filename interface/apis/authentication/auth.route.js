const express = require('express');
const router = express.Router();

const signInValidator = global['interface.apis.controller.authentication.signInValidator'];
const authController  = global['interface.apis.controller.authentication.authController'];

router.post('/signin', signInValidator, authController.postSignIn);

router.post('/signup', signInValidator, authController.postSignUp);

module.exports = router;