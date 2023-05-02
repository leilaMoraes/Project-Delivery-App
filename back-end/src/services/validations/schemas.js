const joi = require('joi');

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
}).messages({
  'any.required': 'Invalid email or password',
  'string.email': 'Invalid email or password',
}).required();

const newUserSchema = joi.object({
  email: joi.string().email().required(),
  name: joi.string().min(12).required(),
  password: joi.string().min(6).required(),
  role: joi.string().valid('admin', 'customer', 'seller'),
});

module.exports = {
  loginSchema,
  newUserSchema,
};
