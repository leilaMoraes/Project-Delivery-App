import { ModelStatic } from 'sequelize';
import Product from '../database/models/Product';
import IServiceProduct from '../interfaces/serviceProduct.interface';
import IProduct from '../interfaces/product.interface';
import { io } from '../api/server';
import NotFoundException from '../errors/NotFoundException';

export default class ProductService implements IServiceProduct {
  #model: ModelStatic<Product>;

  constructor(model: ModelStatic<Product>) {
    this.#model = model;
  }

  getAll = async () => {
    const products = await this.#model.findAll({ raw: true });
    return products;
  };

  create = async (product: IProduct) => {
    const { name, price, urlImage } = product;
    const newPrice = Number(price);
    const newProduct = (await this.#model.create({ name, price: newPrice, urlImage }, { raw: true }))
      .get({ plain: true });
    io.emit('products@new', newProduct);
    return newProduct;
  }

  deleteProduct = async (id: string) => {
    const productExists = await this.#model.findByPk(id, { raw: true });
    if (!productExists) new NotFoundException('Product not found');
    await this.#model.destroy({ where: { id } });
    io.emit('products@delete', productExists?.name);
  }
}