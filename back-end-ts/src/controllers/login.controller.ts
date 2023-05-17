import { Request, Response } from 'express';
import StatusCodes from '../utils/statusCode';
import { ILogin } from '../interfaces/login.interface';
import IServiceLogin from '../interfaces/serviceLogin.interface';

export default class LoginController {
  #service: IServiceLogin;

  constructor(service: IServiceLogin) {
    this.#service = service;
  }

  login = async (req: Request<object, object, ILogin>, res: Response) => {
    const { body } = req;
    const user = await this.#service.login(body);
    return res.status(StatusCodes.OK).json(user);
  };
}