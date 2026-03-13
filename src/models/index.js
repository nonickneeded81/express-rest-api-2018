import Sequelize from 'sequelize';
import config from '../../config/db';
import postFactory from './post';

const env = process.env.NODE_ENV || 'development';

export const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  config[env],
);

export const db = {
  Post: postFactory(sequelize, Sequelize.DataTypes),
};
