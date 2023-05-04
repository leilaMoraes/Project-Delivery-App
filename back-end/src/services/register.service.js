const { validateNewUser } = require('./validations/validationsInputValues');
const { User } = require('../database/models');
const { createHash } = require('../utils/decrypt');
const { generateToken } = require('../utils/jwt');

const register = async (user) => {
  const error = validateNewUser(user);
  const { email, password, name, role } = user;
  if (error) return error;
  const userExists = await User.findOne({ where: { email }, raw: true });
  if (userExists) return { status: 409, message: 'User already exists!' };
  const hash = createHash(password);
  const newUser = (await User.create({ email, password: hash, name, role }, { raw: true }))
    .get({ plain: true });
  const { password: _, ...rest } = newUser;
  const token = await generateToken({ ...rest });
  return { status: 201, token };
};

module.exports = {
  register,
};
