import Sequelize from 'sequelize';
import Post from './post';
import config from '../../config/db';

const env = process.env.NODE_ENV || 'development';

const c = config[env];
export const sequelize = new Sequelize(c.database, c.username, c.password, c);

export const db = {
  Post: Post(sequelize, Sequelize),
};

// associate models
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
