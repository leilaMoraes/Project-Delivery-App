const { validateNewUser } = require('./validations/validationsInputValues');
const { User } = require('../database/models');
const { createHash } = require('../utils/decrypt');

const createUser = async (user) => {
  const error = validateNewUser(user);
  if (error) return error;
  const { email, password, name, role } = user;
  const userExists = await User.findOne({ where: { email }, raw: true });
  if (userExists) return { status: 409, message: 'User already exists!' };
  const hash = createHash(password);
  const newUser = (await User
    .create({ email, password: hash, name, role }, { raw: true }))
    .get({ plain: true });
  const { password: _, ...rest } = newUser;
  return rest;
};

const getUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] }, raw: true });
  return users;
};

const deleteUser = async (id) => {
  const userExists = await User.findByPk(id, { raw: true });
  if (!userExists) return { status: 404, message: 'User not found!' };
  await User.destroy({ where: { id } });
};

module.exports = {
  createUser,
  getUsers,
  deleteUser,
};
