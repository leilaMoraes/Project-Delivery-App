const express = require('express');
const { adminController } = require('../controllers');
const auth = require('../middlewares/auth');

const adminRouter = express.Router();

adminRouter.use(auth);

adminRouter.post('/', adminController.createUser);

adminRouter.get('/', adminController.getUsers);

adminRouter.delete('/:id', adminController.deleteUser);

module.exports = adminRouter;
