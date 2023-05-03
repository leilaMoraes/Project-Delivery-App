const express = require('express');
const { productController } = require('../controllers');
const auth = require('../middlewares/auth');

const productRouter = express.Router();

productRouter.use(auth);

productRouter.get('/', productController.getAll);

module.exports = productRouter;
