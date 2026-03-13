// @flow
import Sequelize from 'sequelize';
import config from '../../config/db';
import postModel from './post';

const env = process.env.NODE_ENV || 'development';

export const sequelize =
  new Sequelize(config[env].database, config[env].username, config[env].password, config[env]);

export const db = {
  Post: postModel(sequelize, Sequelize.DataTypes),
};

// associate models
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
