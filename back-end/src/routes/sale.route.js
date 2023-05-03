const express = require('express');
const { saleController } = require('../controllers');
const auth = require('../middlewares/auth');
const { validadeCustomer, validateSeller } = require('../middlewares/validateRole');

const saleRouter = express.Router();

saleRouter.use(auth);

saleRouter.post('/', saleController.create);

saleRouter.get('/customer/:id', validadeCustomer, saleController.getCustomerSales);

saleRouter.use(validateSeller);

saleRouter.get('/seller/:id', saleController.getSellerSales);

saleRouter.patch('/status/:id', saleController.updateStatus);

module.exports = saleRouter;
