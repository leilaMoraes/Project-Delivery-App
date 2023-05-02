const { loginService } = require('../services');

const login = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await loginService.login(req.body);
    if (user.message) return next(user);
    const { token, status } = user;
    return res.status(status).json({ token });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
};
