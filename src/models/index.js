// @flow
import Sequelize from 'sequelize';
import config from '../../config/db';
import PostFactory from './post';

const env = process.env.NODE_ENV || 'development';

export const sequelize =
  new Sequelize(config[env].database, config[env].username, config[env].password, config[env]);

const Post = PostFactory(sequelize, Sequelize.DataTypes);

export const db = {
  Post,
};
