import { Sequelize, DataTypes } from 'sequelize';
import PostModel from './post';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../../config/db');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig,
);

export const db = {
  Post: PostModel(sequelize, DataTypes),
};

// associate models
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
