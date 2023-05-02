const express = require('express');
const { saleController } = require('../controllers');

const saleRouter = express.Router();

saleRouter.post('/', saleController.create);

saleRouter.get('/customer/:id', saleController.getCustomerSales);

saleRouter.get('/seller/:id', saleController.getSellerSales);

module.exports = saleRouter;
