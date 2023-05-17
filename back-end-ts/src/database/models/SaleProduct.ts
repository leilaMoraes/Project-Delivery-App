import {
  INTEGER,
  Model,
  STRING,
  DECIMAL,
  DATE
} from 'sequelize';
import db from '.';
import Sale from './Sale';
import Product from './Product';

class SaleProduct extends Model {
  declare saleId: number;
  declare productId: number;
  declare quantity: number;
}

SaleProduct.init({
  saleId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    field: 'sale_id',
    references: {
      model: 'sales',
      key: 'id',
    },
  },
  productId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    field: 'product_id',
    references: {
      model: 'products',
      key: 'id',
    },
  },
  quantity: {
    allowNull: false,
    type: INTEGER,
  },
}, {
  sequelize: db,
  underscored: true,
  tableName: 'sales_products',
  timestamps: false,
});


Sale.belongsToMany(Product, {
  as: 'products',
  through: SaleProduct,
  foreignKey: 'saleId',
  otherKey: 'productId',
});
Product.belongsToMany(Sale, {
  as: 'sales',
  through: SaleProduct,
  foreignKey: 'productId',
  otherKey: 'saleId',
})

export default SaleProduct;

