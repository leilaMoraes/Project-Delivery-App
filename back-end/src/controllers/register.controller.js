const { registerService } = require('../services');

const register = async (req, res, next) => {
  const response = await registerService.register(req.body);
  if (response.message) return next(response);
  const { status, ...rest } = response;
  return res.status(status).json({ ...rest });
};

module.exports = {
  register,
};
