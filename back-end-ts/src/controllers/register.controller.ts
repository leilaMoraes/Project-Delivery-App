import { Request, Response } from 'express';
import StatusCodes from '../utils/statusCode';
import IServiceRegister from '../interfaces/serviceRegister.interface';
import IRegister from '../interfaces/register.interface';

export default class RegisterController {
  #service: IServiceRegister;

  constructor(service: IServiceRegister) {
    this.#service = service;
  }

  register = async (req: Request<object, object, IRegister>, res: Response) => {
    const { email, name, password, role = 'customer' } = req.body;
    const user = await this.#service.register({ name, email, password, role });
    return res.status(StatusCodes.CREATED).json(user);
  };
}