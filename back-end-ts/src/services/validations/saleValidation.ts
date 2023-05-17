import ISale, { ISaleValidation } from "../../interfaces/sale.interface";
import BadRequestException from "../../errors/BadRequestException";
import { newSaleSchem } from "./schemas";

export default class SaleValidation implements ISaleValidation {
  validateSale = (sale: ISale) => {
    const { error } = newSaleSchem.validate(sale);
    if (error) throw new BadRequestException(error.message);
  }
}
