const joi = require('joi');

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
}).messages({
  'any.required': 'Invalid email or password',
  'string.email': 'Invalid email or password',
}).required();

module.exports = {
  loginSchema,
};
