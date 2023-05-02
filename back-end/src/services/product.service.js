const { Product } = require('../database/models');

const getAll = async () => {
  const products = await Product.findAll({ raw: true });
  return products;
};

module.exports = { getAll };
