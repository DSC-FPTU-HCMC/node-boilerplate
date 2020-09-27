const express = require('express');
const router = express.Router();

const { timetableController } = require('../controllers/');
const { timetableValidator } = require('../validators/');

router.get('/', timetableController.findAll);

router.get('/:id', timetableController.findById);

router.post('/', timetableValidator, timetableController.create);

module.exports = router;