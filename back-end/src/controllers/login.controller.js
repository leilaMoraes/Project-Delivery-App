const { loginService } = require('../services');

const login = async (req, res, next) => {
  const user = await loginService.login(req.body);
  if (user.message) return next(user);
  const { token, status } = user;
  return res.status(status).json({ token });
};

module.exports = {
  login,
};
