const express = require('express');
const { sellerController } = require('../controllers');
const auth = require('../middlewares/auth');
const { validateSeller } = require('../middlewares/validateRole');

const sellerRouter = express.Router();

sellerRouter.use(auth);

sellerRouter.use(validateSeller);

sellerRouter.get('/', sellerController.getAll);

module.exports = sellerRouter;
