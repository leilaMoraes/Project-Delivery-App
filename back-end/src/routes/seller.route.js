const express = require('express');
const { sellerController } = require('../controllers');
const auth = require('../middlewares/auth');

const sellerRouter = express.Router();

sellerRouter.use(auth);

sellerRouter.get('/', sellerController.getAll);

module.exports = sellerRouter;
