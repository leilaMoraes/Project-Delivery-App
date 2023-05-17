import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import LoginValidation from '../services/validations/loginValidations';
import LoginService from '../services/login.service';
import Token from '../utils/jwt';
import User from '../database/models/User';
import Decrypt from '../utils/decypt';

const loginRoutes = Router();
const token = new Token();
const loginValidation = new LoginValidation();
const hash = new Decrypt;
const loginService = new LoginService(token, User, loginValidation, hash);
const loginController = new LoginController(loginService);
loginRoutes.post('/', loginController.login);

export default loginRoutes;
