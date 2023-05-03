const express = require('express');
const { saleController } = require('../controllers');
const auth = require('../middlewares/auth');

const saleRouter = express.Router();

saleRouter.use(auth);

saleRouter.post('/', saleController.create);

saleRouter.get('/customer/:id', saleController.getCustomerSales);

saleRouter.get('/seller/:id', saleController.getSellerSales);

saleRouter.patch('/status/:id', saleController.updateStatus);

module.exports = saleRouter;
