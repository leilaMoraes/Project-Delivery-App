import { Request, Response } from 'express';
import StatusCodes from '../utils/statusCode';
import { IServiceSale } from '../interfaces/sale.interface';

export default class SaleController {
  #service: IServiceSale;

  constructor(service: IServiceSale) {
    this.#service = service;
  }

  create = async (req: Request, res: Response) => {
    const { body } = req;
    const sale = await this.#service.create(body);
    return res.status(StatusCodes.CREATED).json(sale);
  };

  getCustomerSales = async (req: Request, res: Response) => {
    const { id } = req.params;
    const sale = await this.#service.getCustomerSales(id);
    return res.status(StatusCodes.OK).json(sale);
  };

  getSellerSales = async (req: Request, res: Response) => {
    const { id } = req.params;
    const sale = await this.#service.getSellerSales(id);
    return res.status(StatusCodes.OK).json(sale);
  };

  updateStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    await this.#service.updateStatus(id, status);
    return res.status(StatusCodes.OK).json({ message: 'Status updated' });
  }
  
}