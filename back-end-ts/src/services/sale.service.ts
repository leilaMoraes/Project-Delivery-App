import { ModelStatic } from "sequelize/types";
import { literal } from "sequelize";
import Sale from "../database/models/Sale";
import SaleProduct from "../database/models/SaleProduct";
import ISale, { ISaleValidation, IServiceSale } from "../interfaces/sale.interface";
import sequelize from '../database/models';
import Product from "../database/models/Product";
import ConflictException from "../errors/ConflictExeception";
import BadRequestException from "../errors/BadRequestException";
import NotFoundException from "../errors/NotFoundException";
import UnprocessableContentExeception from "../errors/UnprocessableContentExeception";
import { io } from '../api/server';
import { log } from "console";

export default class SaleService implements IServiceSale {
  #model: ModelStatic<Sale>;
  #otherModel: ModelStatic<SaleProduct>;
  #validation: ISaleValidation;

  constructor(model: ModelStatic<Sale>, otherModel: ModelStatic<SaleProduct>, validation: ISaleValidation) {
    this.#model = model;
    this.#otherModel = otherModel;
    this.#validation = validation;
  }

  getCustomerSales = async (id: string) => {
    const sales = await this.#model.findAll({
      where: { userId: id },
      include: {
        model: Product, as: 'products',
        through: {
          attributes: [],
        },
        attributes: ['id', 'name', 'price', 'urlImage', [literal('`products->SaleProduct`.`quantity`'), 'quantity']],
      }
    });
    return sales;
  }

  getSellerSales = async (id: string) => {
    const sales = await this.#model.findAll({
      where: { sellerId: id },
      include: {
        model: Product, as: 'products',
        through: {
          attributes: [],
        },
        attributes: ['id', 'name', 'price', 'urlImage', [literal('`products->SaleProduct`.`quantity`'), 'quantity']],
      }
    });
    return sales;
  }

  create = async (sale: ISale) => {
    this.#validation.validateSale(sale);
    try {
      const result = await sequelize.transaction(async (t) => {
        const newSale = (await this.#model.create({ ...sale }, { transaction: t }))
          .get({ plain: true });
        await Promise.all(sale.cart.map(async ({ productId, quantity }) => this.#otherModel
          .create({ saleId: newSale.id, productId, quantity }, { transaction: t })));
        const salebyId = await this.#model.findByPk(newSale.id,
          {
            include: {
              model: Product, as: 'products',
              through: { attributes: [] },
              attributes: ['id', 'name', 'price', 'urlImage', [sequelize.literal('`products->SaleProduct`.`quantity`'), 'quantity']],
            }, transaction: t
          });
        return salebyId;
      });
      io.emit('sales@new', result);
      return result;
    } catch (error: unknown) {
      throw new Error((error as Error).message);
    }
  }

  updateStatus = async (id: string, status: string) => {
    const sale = await this.#model.findByPk(id);
    if (!sale) throw new NotFoundException('Sale not found');
    if (sale.status === 'Delivered') throw new UnprocessableContentExeception('Sale already delivered');
    if (!['In Transit', 'Preparing', 'Delivered'].includes(status)) throw new BadRequestException('Invalid status, status should be "In Transit", "Preparing" or "Delivered"');
    await this.#model.update({ status }, { where: { id } } );
    io.emit('sales@update', { id, status });
  }
}
