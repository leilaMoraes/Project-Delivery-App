import {
  INTEGER,
  Model,
  STRING,
} from 'sequelize';
import db from '.';

class User extends Model {
  declare readonly id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: string;
}

User.init({
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
  email: {
    allowNull: false,
    type: STRING,
  },
  password: {
    allowNull: false,
    type: STRING,
  },
  role: {
    allowNull: false,
    type: STRING,
  },
}, {
  sequelize: db,
  tableName: 'users',
  timestamps: false,
});

export default User;