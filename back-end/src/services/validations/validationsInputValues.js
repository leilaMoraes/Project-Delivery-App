const { loginSchema, newUserSchema, newSaleSchema } = require('./schemas');

const validateLogin = (login) => {
  const { error } = loginSchema.validate(login);
  if (error) return { status: 400, message: error.message };
};

const validateNewUser = (user) => {
  const { error } = newUserSchema.validate(user);
  if (error) return { status: 400, message: error.message };
};

const validateNewSale = (sale) => {
  const { error } = newSaleSchema.validate(sale);
  if (error) return { status: 400, message: error.message };
};

module.exports = {
  validateLogin,
  validateNewUser,
  validateNewSale,
};
