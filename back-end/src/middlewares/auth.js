const { authToken } = require('../utils/jwt');

const auth = async (req, _res, next) => {
  const token = req.header('Authorization');
  if (!token) return next({ message: 'Token not found', status: 401 });
  try {
    const user = await authToken(token);
    console.log(token, user);
    req.user = user;
    return next();
  } catch (error) {
    return next({ message: 'Token must be a valid token', status: 401 });
  }
};

module.exports = auth;
