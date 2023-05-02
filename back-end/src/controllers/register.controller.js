const { registerService } = require('../services');

const register = async (req, res, next) => {
  try {
    const response = await registerService.register(req.body);
    if (response.message) return next(response);
    const { status, token } = response;
    return res.status(status).json({ token });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
};
