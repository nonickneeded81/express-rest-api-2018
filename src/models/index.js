import Sequelize from 'sequelize';
import { createRequire } from 'module';
import PostModel from './post.js';

const require = createRequire(import.meta.url);
const config = require('../../config/db.cjs');

const env = process.env.NODE_ENV || 'development';

export const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  config[env],
);

export const db = {
  Post: PostModel(sequelize, Sequelize.DataTypes),
};

// associate models
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
