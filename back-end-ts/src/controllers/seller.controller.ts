import { Request, Response } from 'express';
import StatusCodes from '../utils/statusCode';
import IServiceSeller from '../interfaces/serviceSeller.interface';

export default class SellerController {
  #service: IServiceSeller;

  constructor(service: IServiceSeller) {
    this.#service = service;
  }

  getAll = async (_req: Request, res: Response) => {
    const sellers = await this.#service.getAll();
    return res.status(StatusCodes.OK).json(sellers);
  };

}