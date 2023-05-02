const express = require('express');
const { saleController } = require('../controllers');

const saleRouter = express.Router();

saleRouter.post('/', saleController.create);

module.exports = saleRouter;
