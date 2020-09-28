const { celebrate, Joi, Segments } = require('celebrate');

module.exports = celebrate({
  [Segments.BODY]: {
    username: Joi.string().required().error(new Error('Username is required')),
    password: Joi.string().required().error(new Error('Password is required'))
  }
});
