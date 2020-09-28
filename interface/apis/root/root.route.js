const express = require('express');
const router = express.Router();

const authRoute = require('../authentication/auth.route');
const timetableRoute = require('../timetable/timetable.route');

router.use('/auth', authRoute);

router.use('/timetables', timetableRoute);

module.exports = router;