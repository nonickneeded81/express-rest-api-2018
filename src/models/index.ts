import { Sequelize, DataTypes } from 'sequelize';
import config from '../../config/db';
import postModel from './post';

const env = process.env.NODE_ENV || 'development';
const dbConfig = (config as any)[env];

export const sequelize =
  new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

export const db = {
  Post: postModel(sequelize, DataTypes),
};
