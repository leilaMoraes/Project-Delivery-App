const { loginService } = require('../services');

const login = async (req, res, next) => {
  const user = await loginService.login(req.body);
  if (user.message) return next(user);
  const { status, ...rest } = user;
  return res.status(status).json({ ...rest });
};

module.exports = {
  login,
};
