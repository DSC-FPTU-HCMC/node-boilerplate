const express = require('express');
const router = express.Router();

const { signInValidator } = require('../validators/');
const { authController }  = require('../controllers/');

router.post('/signin', signInValidator, authController.postSignIn);

router.post('/signup', signInValidator, authController.postSignUp);

module.exports = router;