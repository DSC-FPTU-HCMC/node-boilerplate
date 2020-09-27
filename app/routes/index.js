const express = require('express');
const router = express.Router();

const authRoute = require('./auth.route');
const timetableRoute = require('./timetable.route');

router.use('/auth', authRoute);

router.use('/timetables', timetableRoute);

module.exports = router;