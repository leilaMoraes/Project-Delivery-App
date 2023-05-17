import { Request, Response } from 'express';
import StatusCodes from '../utils/statusCode';
import IRegister from '../interfaces/register.interface';
import IServiceAdmin from '../interfaces/admin.interface';

export default class AdminController {
  #service: IServiceAdmin;

  constructor(service: IServiceAdmin) {
    this.#service = service;
  }

  createUser = async (req: Request<object, object, IRegister>, res: Response) => {
    const { email, name, password, role } = req.body;
    const user = await this.#service.createUser({ name, email, password, role });
    return res.status(StatusCodes.CREATED).json(user);
  };

  getUsers = async (_req: Request, res: Response) => {
    const users = await this.#service.getUsers();
    return res.status(StatusCodes.OK).json(users);
  };

  deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.#service.deleteUser(id);
    return res.sendStatus(StatusCodes.NO_CONTENT);
  };
}