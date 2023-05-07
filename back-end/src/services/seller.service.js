const { User } = require('../database/models');

const getAll = async () => {
  const sellers = await User.findAll({
    where: { role: 'seller' },
    attributes: ['id', 'name'],
  });
  return sellers;
};

module.exports = { getAll };
