const jwt = require('jsonwebtoken');
const fs = require('fs/promises');

const generateToken = async (payload) => {
  const secret = await fs.readFile('./jwt.evaluation.key', 'utf-8');
  const token = jwt.sign(payload, secret, { expiresIn: '3h', algorithm: 'HS256' });
  return token;
};

const authToken = async (token) => {
  const secret = await fs.readFile('./jwt.evaluation.key', 'utf-8');
  const validateToken = jwt.verify(token, secret);
  return validateToken;
};

module.exports = {
  generateToken,
  authToken,
};
