import { ModelStatic } from "sequelize/types";
import User from "../database/models/User";
import IServiceSeller from "../interfaces/serviceSeller.interface";

export default class SellerService implements IServiceSeller {
  #model: ModelStatic<User>;

  constructor(model: ModelStatic<User>) {
    this.#model = model;
  }

  getAll = async () => {
    const sellers = await this.#model.findAll({
      where: { role: 'seller' },
      attributes: ['id', 'name'],
    });
    return sellers;
  };
  
}