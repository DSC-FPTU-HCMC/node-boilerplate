const express = require('express');
const router = express.Router();

const { loginValidator } = require('../validators/');
const controller = require('../controllers/auth.controller');

router.post('/signin', loginValidator, controller.postSignIn);

router.post('/signup', loginValidator, controller.postSignUp);

module.exports = router;