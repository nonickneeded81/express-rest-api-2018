// @flow
import Sequelize from 'sequelize';
import config from '../../config/db';
import postModel from './post';

const env = process.env.NODE_ENV || 'development';

const { database, username, password } = config[env];
export const sequelize = new Sequelize(database, username, password, config[env]);

export const db = {
  Post: postModel(sequelize, Sequelize.DataTypes),
};

// associate models
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
