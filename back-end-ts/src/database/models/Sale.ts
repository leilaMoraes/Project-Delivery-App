import {
  INTEGER,
  Model,
  STRING,
  DECIMAL,
  DATE
} from 'sequelize';
import db from '.';
import User from './User';

class Sale extends Model {
  declare readonly id: number;
  declare userId: number;
  declare sellerId: number;
  declare totalPrice: number;
  declare deliveryAddress: string;
  declare deliveryNumber: string;
  declare saleDate: Date;
  declare status: string;
}

Sale.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  userId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id',
    },
  },
  sellerId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    field: 'seller_id',
    references: {
      model: 'users',
      key: 'id',
    },
  },
  totalPrice: {
    allowNull: false,
    type: DECIMAL(9, 2),
  },
  deliveryAddress: {
    allowNull: false,
    type: STRING,
  },
  deliveryNumber: {
    allowNull: false,
    type: INTEGER,
  },
  saleDate: {
    allowNull: false,
    type: DATE,
  },
  status: {
    allowNull: false,
    type: STRING,
    defaultValue: 'Pending',
  },
}, {
  sequelize: db,
  underscored: true,
  tableName: 'sales',
  createdAt: 'saleDate',
  updatedAt: false,
});

User.hasMany(Sale, { foreignKey: 'userId', as: 'user' });
Sale.belongsTo(User, { foreignKey: 'userId', as: 'saleUser' });
User.hasMany(Sale, { foreignKey: 'sellerId', as: 'seller' });
Sale.belongsTo(User, { foreignKey: 'sellerId', as: 'saleSeller' });

export default Sale;