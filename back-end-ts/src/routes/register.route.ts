import { Router } from 'express';
import Token from '../utils/jwt';
import User from '../database/models/User';
import Decrypt from '../utils/decypt';
import RegisterValidation from '../services/validations/registerValidation';
import RegisterService from '../services/register.service';
import RegisterController from '../controllers/register.controller';

const registerRoutes = Router();
const token = new Token();
const registerValidation = new RegisterValidation();
const hash = new Decrypt();
const registerService = new RegisterService(token, User, registerValidation, hash);
const registerController = new RegisterController(registerService);
registerRoutes.post('/', registerController.register);

export default registerRoutes;
