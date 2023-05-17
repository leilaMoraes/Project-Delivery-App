import { ModelStatic } from 'sequelize';
import User from '../database/models/User';
import { IToken } from '../interfaces/auth.interface';
import Decrypt from '../utils/decypt';
import IRegister, { IRegisterValidation } from '../interfaces/register.interface';
import ConflictException from '../errors/ConflictExeception';
import IServiceRegister from '../interfaces/serviceRegister.interface';

export default class RegisterService implements IServiceRegister {
  #model: ModelStatic<User>;
  #validation: IRegisterValidation;
  #token: IToken;
  #hash: Decrypt;

  constructor(token: IToken, model: ModelStatic<User>, validation: IRegisterValidation, hash: Decrypt) {
    this.#validation = validation;
    this.#token = token;
    this.#model = model;
    this.#hash = hash;
  }

  register = async (user: IRegister) => {
    this.#validation.validateRegister(user);
    const { email, password, name, role } = user;
    console.log(user);
    const userExists = await this.#model.findOne({ where: { email }, raw: true });
    if (userExists) {
      throw new ConflictException('User already exists!');
    }
    const hash = this.#hash.createHash(password);
    const newUser = (await this.#model
      .create({ email, password: hash, name, role }, { raw: true }))
      .get({ plain: true });
    const { password: _, ...rest } = newUser;
    const token = await this.#token.generateToken({ ...rest });
    return { user: rest, token };
  };
}