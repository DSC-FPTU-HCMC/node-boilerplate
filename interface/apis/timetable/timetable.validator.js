const { celebrate, Joi, Segments } = require('celebrate');

const timetableValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    description: Joi.string().required(),
    place: Joi.string()
  }
});

global.setGlobalVariable(
  'interface.apis.timetable.timetableValidator',
  timetableValidator
);