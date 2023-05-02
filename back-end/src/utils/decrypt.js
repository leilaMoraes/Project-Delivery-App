const crypto = require('crypto');

const createHash = (password) => {
  const hash = crypto.createHash('md5').update(password).digest('hex');
  return hash;
};

const compareHash = (password, hash) => {
  const passwordHash = createHash(password);
  return passwordHash === hash;
};

module.exports = {
  createHash,
  compareHash,
};
