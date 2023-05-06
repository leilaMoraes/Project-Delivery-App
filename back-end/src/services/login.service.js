const { validateLogin } = require('./validations/validationsInputValues');
const { User } = require('../database/models');
const { compareHash } = require('../utils/decrypt');
const { generateToken } = require('../utils/jwt');

const login = async (loginObj) => {
  const error = validateLogin(loginObj);
  if (error) return error;
  const { email, password } = loginObj;
  const user = await User.findOne({ where: { email }, raw: true });
  if (!user) return { status: 404, message: 'Not Found' };
  if (!compareHash(password, user.password)) {
    return { status: 400, message: 'Invalid email or password' };
  }
  const { password: _, ...rest } = user;
  const token = await generateToken({ ...rest });
  return { status: 200, token, user: rest };
};

module.exports = {
  login,
};
