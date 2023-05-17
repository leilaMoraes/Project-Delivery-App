import { Router } from 'express';
import Product from '../database/models/Product';
import ProductService from '../services/product.service';
import ProductController from '../controllers/product.controller';
import upload from '../utils/upload';
import AuthMiddleware from '../middlewares/auth.middleware';
import Token from '../utils/jwt';

const productRoutes = Router();
const productService = new ProductService(Product);
const productController = new ProductController(productService);
const token = new Token()
const { auth } = new AuthMiddleware(token);
productRoutes.use(auth);
productRoutes.get('/', productController.getAll);
productRoutes.post('/register', upload.single('image'), productController.create);
productRoutes.delete('/:id', productController.deleteProduct);

export default productRoutes;
