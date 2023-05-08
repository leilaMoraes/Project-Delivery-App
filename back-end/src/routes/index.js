const express = require('express');
const loginRouter = require('./login.route');
const registerRouter = require('./register.route');
const productRouter = require('./product.route');
const saleRouter = require('./sale.route');
const adminRouter = require('./admin.route');
const sellerRouter = require('./seller.route');

const routes = express.Router();

routes.use('/login', loginRouter);

routes.use('/register', registerRouter);

routes.use('/products', productRouter);

routes.use('/sales', saleRouter);

routes.use('/admin', adminRouter);

routes.use('/sellers', sellerRouter);

module.exports = routes;
