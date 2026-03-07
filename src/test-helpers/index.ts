import { sequelize } from '../models';

(sequelize as any).options.logging = false;

export const cleanDatabase = () => {
  let tableNames: any[];
  const DATABASE_NAME_TEST = 'Tables_in_express_rest_api_2018_test';
  return sequelize.query('SHOW TABLES')
    .then((data: any) => {
      tableNames = data[0];
      return sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    })
    .then(() => {
      const promises = tableNames.map((tableName: any) => {
        const name = tableName[DATABASE_NAME_TEST];
        if (name === 'SequelizeMeta') {
          return true;
        }
        return sequelize.query(`TRUNCATE ${name}`);
      });
      return Promise.all(promises);
    })
    .then(() => {
      return sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    });
};
