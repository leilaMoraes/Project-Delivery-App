const express = require('express');
const { adminController } = require('../controllers');
const auth = require('../middlewares/auth');
const { validateAdmin } = require('../middlewares/validateRole');

const adminRouter = express.Router();

adminRouter.use(auth);

adminRouter.use(validateAdmin);

adminRouter.post('/', adminController.createUser);

adminRouter.get('/', adminController.getUsers);

adminRouter.delete('/:id', adminController.deleteUser);

module.exports = adminRouter;
