const { Product } = require('../database/models');
const { io } = require('../api/app');

const getAll = async () => {
  const products = await Product.findAll({ raw: true });
  return products;
};

const create = async (product) => {
  const { name, price, urlImage } = product;
  const newProduct = (await Product.create({ name, price, urlImage }, { raw: true }))
    .get({ plain: true });
  // io.emit('products@new', newProduct);
  return newProduct;
};

module.exports = { getAll, create };
