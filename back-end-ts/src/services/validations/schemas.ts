import * as Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).messages({
  'any.required': 'Invalid email or password',
  'string.email': 'Invalid email or password',
}).required();

const sale = Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().required(),
})

const newSaleSchem = Joi.object({
  userId: Joi.number().integer().required(),
  sellerId: Joi.number().integer().required(),
  totalPrice: Joi.number().required(),
  deliveryAddress: Joi.string().required(),
  deliveryNumber: Joi.number().required(),
  cart: Joi.array().items(sale).required(),
});

const newUserSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(12).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'customer', 'seller'),
});

export {
  loginSchema,
  newSaleSchem,
  newUserSchema,
};
