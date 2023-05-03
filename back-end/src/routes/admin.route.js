const express = require('express');
const { adminController } = require('../controllers');

const adminRouter = express.Router();

adminRouter.post('/', adminController.createUser);

module.exports = adminRouter;
