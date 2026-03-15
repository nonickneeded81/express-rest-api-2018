import Sequelize from 'sequelize';
import config from '../../config/db';
import PostFactory from './post';

const env = process.env.NODE_ENV || 'development';

const dbConfig = config[env];
// eslint-disable-next-line max-len
export const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

export const db = {
  Post: PostFactory(sequelize, Sequelize.DataTypes),
};
