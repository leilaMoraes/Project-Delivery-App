const { sellerService } = require('../services');

const getAll = async (_req, res) => {
  const sellers = await sellerService.getAll();
  return res.status(200).json(sellers);
};

module.exports = { getAll };
