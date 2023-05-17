import { ModelStatic } from 'sequelize';
import User from '../database/models/User';
import Decrypt from '../utils/decypt';
import IRegister, { IRegisterValidation } from '../interfaces/register.interface';
import ConflictException from '../errors/ConflictExeception';
import IServiceAdmin from '../interfaces/admin.interface';
import NotFoundException from '../errors/NotFoundException';

export default class AdminService implements IServiceAdmin {
  #model: ModelStatic<User>;
  #validation: IRegisterValidation;
  #hash: Decrypt;

  constructor(model: ModelStatic<User>, validation: IRegisterValidation, hash: Decrypt) {
    this.#validation = validation;
    this.#model = model;
    this.#hash = hash;
  }

  createUser = async (user: IRegister) => {
    this.#validation.validateRegister(user);
    const { email, password, name, role } = user;
    const userExists = await this.#model.findOne({ where: { email }, raw: true });
    if (userExists) {
      throw new ConflictException('User already exists!');
    }
    const hash = this.#hash.createHash(password);
    const newUser = (await this.#model
      .create({ email, password: hash, name, role }, { raw: true }))
      .get({ plain: true });
    const { password: _, ...rest } = newUser;
    return rest;
  };

  getUsers = async () => {
    const users = await this.#model.findAll({ attributes: { exclude: ['password'] }, raw: true });
    return users;
  };

  deleteUser = async (id: string) => {
    const userExists = await this.#model.findByPk(id, { raw: true });
    if (!userExists) {
      throw new NotFoundException("User doesn't exists!");
    }
    await this.#model.destroy({ where: { id } });
  };
}