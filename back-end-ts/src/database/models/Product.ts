import {
  DECIMAL,
  INTEGER,
  Model,
  STRING,
} from 'sequelize';
import db from '.';

class Product extends Model {
  declare readonly id: number;
  declare name: string;
  declare price: number;
  declare urlImage: string;
}

Product.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  name: {
    allowNull: false,
    type: STRING,
  },
  price: {
    allowNull: false,
    type: DECIMAL(4, 2),
  },
  urlImage: {
    allowNull: false,
    type: STRING,
  },
}, {
  sequelize: db,
  underscored: true,
  tableName: 'products',
  timestamps: false,
});

export default Product;