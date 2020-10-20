const express = require('express');
const router = express.Router();

const timetableController = require('./timetable.controller');
const timetableValidator = require('./timetable.validator');

router.get('/', timetableController.findAll);

router.get('/:id', timetableController.findById);

router.post('/', timetableValidator, timetableController.create);

module.exports = router;