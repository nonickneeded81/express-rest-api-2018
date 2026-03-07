import { Sequelize, DataTypes as DataTypesType } from 'sequelize';
import { createByName as Name } from './validators';

export default (sequelize: Sequelize, DataTypes: typeof DataTypesType) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: Name('Title')
        .notEmpty()
        .len([1, 25])
        .config,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: Name('Body')
        .notEmpty()
        .len([1, 255])
        .config,
    },
  }, {
    underscored: true,
  });
  return Post;
};
