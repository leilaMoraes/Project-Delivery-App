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

const getCustomerSales = async (req, res) => {
  const { id } = req.params;
  const sales = await saleService.getCustomerSales(id);
  return res.status(200).json(sales);
};

const getSellerSales = async (req, res) => {
  const { id } = req.params;
  const sales = await saleService.getSellerSales(id);
  return res.status(200).json(sales);
};

const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  const error = await saleService.updateStatus(id, status);
  if (error) return next(error);
  return res.status(200).json({ message: 'Status updated' });
};

module.exports = {
  create,
  getCustomerSales,
  getSellerSales,
  updateStatus,
};
