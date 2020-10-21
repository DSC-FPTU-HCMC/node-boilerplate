const express = require('express');
const router = express.Router();

const authRoute = require('../authentication/auth.route');
const timetableRoute = require('../timetable/timetable.route');
const uploadImageRoute = require('../upload-image/upload-image.route');

router.use('/auth', authRoute);

router.use('/timetables', timetableRoute);

router.use('/upload-image', uploadImageRoute);

module.exports = router;