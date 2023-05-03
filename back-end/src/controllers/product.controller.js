const { productService } = require('../services');

const getAll = async (_req, res) => {
  const products = await productService.getAll();
  return res.status(200).json(products);
};

const create = async (req, res) => {
  const urlImage = `http://localhost:3001/images/${req.file.filename}`;
  const { name, price } = req.body;
  const product = await productService.create({ name, price, urlImage });
  return res.status(201).json(product);
};

module.exports = { getAll, create };
