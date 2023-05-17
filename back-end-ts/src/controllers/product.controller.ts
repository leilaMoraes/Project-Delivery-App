import { Request, Response } from 'express';
import StatusCodes from '../utils/statusCode';
import IServiceProduct from '../interfaces/serviceProduct.interface';

export default class ProductController {
  #service: IServiceProduct;

  constructor(service: IServiceProduct) {
    this.#service = service;
  }

  getAll = async (_req: Request, res: Response) => {
    const products = await this.#service.getAll();
    return res.status(StatusCodes.OK).json(products);
  };

  create = async (req: Request, res: Response) => {
    const urlImage = `http://localhost:3001/images/${req.file?.filename}`;
    const { name, price } = req.body;
    const product = await this.#service.create({ name, price, urlImage });
    return res.status(StatusCodes.CREATED).json(product);
  }

  deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.#service.deleteProduct(id);
    return res.sendStatus(StatusCodes.NO_CONTENT);
  }
}