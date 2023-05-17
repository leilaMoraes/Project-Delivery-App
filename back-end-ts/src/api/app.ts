import * as express from 'express';
import 'express-async-errors';
import * as cors from 'cors';
import loginRoutes from "../routes/login.route";
import ErrorHandler from "../middlewares/errorHandler.middleware";
import registerRoutes from '../routes/register.route';
import productRoutes from '../routes/product.route';
import saleRoutes from '../routes/sale.route';
import adminRoutes from '../routes/admin.route';
import * as path from 'node:path';
import sellerRoutes from '../routes/seller.route';

const app = express();

app.use(express.json());
app.use(cors());


app.use('/products/register', express.static(path.resolve(__dirname, '..', '..', 'public', 'images')));
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/products', productRoutes);
app.use('/sales', saleRoutes)
app.use('/admin', adminRoutes);
app.use('/sellers', sellerRoutes);

app.use(ErrorHandler.handle);

app.use(express.static('public'));


export default app;
