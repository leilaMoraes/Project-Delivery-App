const { adminService } = require('../services');

const createUser = async (req, res, next) => {
  const user = await adminService.createUser(req.body);
  if (user.message) return next(user);
  return res.status(201).json(user);
};

const getUsers = async (_req, res) => {
  const users = await adminService.getUsers();
  return res.status(200).json(users);
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const error = await adminService.deleteUser(id);
  if (error) return next(error);
  return res.sendStatus(204);
};

module.exports = {
  createUser,
  getUsers,
  deleteUser,
};
