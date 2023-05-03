const express = require('express');
const { adminController } = require('../controllers');

const adminRouter = express.Router();

adminRouter.post('/', adminController.createUser);

adminRouter.get('/', adminController.getUsers);

adminRouter.delete('/:id', adminController.deleteUser);

module.exports = adminRouter;
