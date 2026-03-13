import { sequelize } from '../models';

(sequelize as any).options.logging = false;

export const cleanDatabase = async () => {
  const DATABASE_NAME_TEST = 'Tables_in_express_rest_api_2018_test';
  const data: any = await sequelize.query('SHOW TABLES');
  const tableNames = data[0];
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  const promises = tableNames.map((tableName: any) => {
    const name = tableName[DATABASE_NAME_TEST];
    if (name === 'SequelizeMeta') {
      return true;
    }
    return sequelize.query(`TRUNCATE ${name}`);
  });
  await Promise.all(promises);
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
};
