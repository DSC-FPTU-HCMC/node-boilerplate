const express = require('express');
const router = express.Router();

const timetableController = global['interface.apis.timetable.timetableController'];
const timetableValidator = global['interface.apis.timetable.timetableValidator'];

router.get('/', timetableController.findAll);

router.get('/:id', timetableController.findById);

router.post('/', timetableValidator, timetableController.create);

global.setGlobalVariable(
  'interface.apis.authentication.timetableRoute',
  router
);