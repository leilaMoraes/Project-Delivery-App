import Product from "../database/models/Product";
import IProduct from "./product.interface";

export default interface IServiceProduct {
  getAll: () => Promise<Product[]>;
  create: (product: IProduct) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
}