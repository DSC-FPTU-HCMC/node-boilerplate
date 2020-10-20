const { celebrate, Joi, Segments } = require('celebrate');

module.exports = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    description: Joi.string().required(),
    place: Joi.string()
  }
});