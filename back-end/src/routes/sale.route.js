const express = require('express');
const { saleController } = require('../controllers');

const saleRouter = express.Router();

saleRouter.post('/', saleController.create);

saleRouter.get('/customer/:id', saleController.getCustomerSales);

module.exports = saleRouter;
