import { ModelStatic } from 'sequelize';
import { ILoginValidation, ILogin } from '../interfaces/login.interface';
import User from '../database/models/User';
import { IToken } from '../interfaces/auth.interface';
import IServiceLogin from '../interfaces/serviceLogin.interface';
import Decrypt from '../utils/decypt';
import BadRequestException from '../errors/BadRequestException';

export default class LoginService implements IServiceLogin {
  #model: ModelStatic<User>;
  #validation: ILoginValidation;
  #token: IToken;
  #hash: Decrypt;

  constructor(token: IToken, model: ModelStatic<User>, validation: ILoginValidation, hash: Decrypt) {
    this.#validation = validation;
    this.#token = token;
    this.#model = model;
    this.#hash = hash;
  }

  login = async (login: ILogin) => {
    this.#validation.validateLogin(login);
    const { email, password } = login;
    const user = await this.#model.findOne({ where: { email }, raw: true });
    if (!user || !this.#hash.compareHash(password, user.password)) {
      throw new BadRequestException('Invalid email or password');
    }
    const { password: _, ...rest } = user;
    const token = await this.#token.generateToken({ ...rest });
    return { user: rest, token };
  };
}