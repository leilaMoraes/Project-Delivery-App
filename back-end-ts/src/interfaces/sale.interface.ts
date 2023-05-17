import Sale from "../database/models/Sale";
import ISaleProduct from "./saleProduct.interface";

export default interface ISale {
  userId: number;
  sellerId: number;
  totalPrice: number;
  deliveryAddress: string;
  deliveryNumber: number;
  cart: Array<ISaleProduct>;
}

export interface IServiceSale {
  create: (s: ISale) => Promise<Sale | null>;
  getCustomerSales(i: string): Promise<Sale[]>;
  getSellerSales(i: string): Promise<Sale[]>;
  updateStatus(i: string, s: string): Promise<void>;
}

export interface ISaleValidation {
  validateSale: (u: ISale) => void
}