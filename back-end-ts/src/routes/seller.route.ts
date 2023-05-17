import { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import Token from '../utils/jwt';
import SellerService from '../services/seller.service';
import SellerController from '../controllers/seller.controller';
import User from '../database/models/User';

const sellerRoutes = Router();
const sellerService = new SellerService(User);
const sellerController = new SellerController(sellerService);
const token = new Token()
const { auth } = new AuthMiddleware(token);
sellerRoutes.use(auth);
sellerRoutes.get('/', sellerController.getAll);

export default sellerRoutes;
