const { adminService } = require('../services');

const createUser = async (req, res, next) => {
  const user = await adminService.createUser(req.body);
  if (user.message) return next(user);
  return res.status(201).json(user);
};

module.exports = {
  createUser,
};
