const { saleService } = require('../services');

const create = async (req, res, next) => {
  try {
    const newSale = await saleService.create(req.body);
    if (newSale.message) return next(newSale);
    const { status, sale } = newSale;
    return res.status(status).json(sale);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
};
