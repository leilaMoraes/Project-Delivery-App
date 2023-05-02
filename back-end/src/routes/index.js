const express = require('express');
const loginRouter = require('./login.route');
const registerRouter = require('./register.route');
const productRouter = require('./product.route');
const saleRouter = require('./sale.route');

const routes = express.Router();

routes.use('/login', loginRouter);

routes.use('/register', registerRouter);

routes.use('/products', productRouter);

routes.use('/sales', saleRouter);

module.exports = routes;
