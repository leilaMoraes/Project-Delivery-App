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
  role: joi.string().valid('customer', 'seller'),
});

const sale = joi.object({
  productId: joi.number().integer().required(),
  quantity: joi.number().integer().required(),
});

const newSaleSchema = joi.object({
  userId: joi.number().integer().required(),
  sellerId: joi.number().integer().required(),
  totalPrice: joi.number().required(),
  deliveryAddress: joi.string().required(),
  deliveryNumber: joi.number().required(),
  cart: joi.array().items(sale).required(),
});

module.exports = {
  loginSchema,
  newUserSchema,
  newSaleSchema,
};
