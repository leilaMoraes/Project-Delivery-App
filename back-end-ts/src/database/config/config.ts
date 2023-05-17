import 'dotenv/config';
import { Options } from 'sequelize';

const environment = process.env.NODE_ENV || 'test';

const suffix: {
  [key: string]: any;
} = {
  prod: '',
  production: '',
  dev: '-dev',
  development: '-dev',
  test: '-test',
};

const config: Options = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'password',
  database: `${process.env.MYSQL_DB_NAME || 'delivery-app'}${suffix[environment] || suffix.test}`,
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
    decimalNumbers: true,
  },
  logging: false,
}

module.exports = config;