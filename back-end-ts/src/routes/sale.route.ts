import { Router } from 'express';
import SaleService from '../services/sale.service';
import Sale from '../database/models/Sale';
import SaleProduct from '../database/models/SaleProduct';
import SaleController from '../controllers/sale.controller';
import SaleValidation from '../services/validations/saleValidation';
import validateRoleMiddleware from '../middlewares/validateRole.middleware';
import AuthMiddleware from '../middlewares/auth.middleware';
import Token from '../utils/jwt';
const saleRoutes = Router();
const saleValdiation = new SaleValidation();
const saleService = new SaleService(Sale, SaleProduct, saleValdiation);
const saleController = new SaleController(saleService);
const token = new Token()
const { auth } = new AuthMiddleware(token);
saleRoutes.use(auth);
saleRoutes.post('/', saleController.create);
saleRoutes.get('/customer/:id', validateRoleMiddleware.validateCustomer, saleController.getCustomerSales);
saleRoutes.patch('/status/:id', saleController.updateStatus);
saleRoutes.use(validateRoleMiddleware.validateSeller);
saleRoutes.get('/seller/:id', saleController.getSellerSales);

export default saleRoutes;
