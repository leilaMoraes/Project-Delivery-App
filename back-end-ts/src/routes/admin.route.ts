import { Router } from 'express';
import User from '../database/models/User';
import Decrypt from '../utils/decypt';
import RegisterValidation from '../services/validations/registerValidation';
import AdminService from '../services/admin.service';
import AdminController from '../controllers/admin.controller';
import validateRoleMiddleware from '../middlewares/validateRole.middleware';
import AuthMiddleware from '../middlewares/auth.middleware';
import Token from '../utils/jwt';
const adminRoutes = Router();
const registerValidation = new RegisterValidation();
const hash = new Decrypt();
const adminService = new AdminService(User, registerValidation, hash);
const adminController = new AdminController(adminService);
const token = new Token()
const { auth } = new AuthMiddleware(token);
adminRoutes.use(auth);
adminRoutes.use(validateRoleMiddleware.validateAdmin);
adminRoutes.post('/', adminController.createUser);
adminRoutes.get('/', adminController.getUsers);
adminRoutes.delete('/:id', adminController.deleteUser);

export default adminRoutes;
