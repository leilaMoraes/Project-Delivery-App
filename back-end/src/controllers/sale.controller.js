const { saleService } = require('../services');

const create = async (req, res, next) => {
  const newSale = await saleService.create(req.body);
  if (newSale.message) return next(newSale);
  const { status, sale } = newSale;
  return res.status(status).json(sale);
};

const getCustomerSales = async (req, res, next) => {
  const { id } = req.params;
  const sales = await saleService.getCustomerSales(id);
  if (sales.message) return next(sales);
  return res.status(200).json(sales);
};

const getSellerSales = async (req, res, next) => {
  const { id } = req.params;
  const sales = await saleService.getSellerSales(id);
  if (sales.message) return next(sales);
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
