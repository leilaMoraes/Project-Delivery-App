const { loginSchema } = require('./schemas');

const validateLogin = (login) => {
  const { error } = loginSchema.validate(login);
  if (error) return { status: 400, message: error.message };
};

module.exports = {
  validateLogin,
};
