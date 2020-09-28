const express = require('express');
const router = express.Router();

const authRoute = global['interface.apis.authentication.authRoute'];
const timetableRoute = global['interface.apis.timetable.timetableRoute']

router.use('/auth', authRoute);

router.use('/timetables', timetableRoute);

global.setGlobalVariable(
  'interface.apis.root.rootRoute',
  router
);