const express = require('express');
const { productController } = require('../controllers');
const auth = require('../middlewares/auth');
const upload = require('../utils/upload');

const productRouter = express.Router();

// productRouter.use(auth);

productRouter.get('/', productController.getAll);

productRouter.post('/register', upload.single('image'), productController.create);

module.exports = productRouter;
