import Sequelize from 'sequelize';
import config from '../../config/db';
import PostModel from './post';

const env = process.env.NODE_ENV || 'development';

const dbConf = config[env];
// eslint-disable-next-line max-len
export const sequelize = new Sequelize(dbConf.database, dbConf.username, dbConf.password, dbConf);

export const db = {
  Post: PostModel(sequelize, Sequelize.DataTypes),
};

// associate models
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
