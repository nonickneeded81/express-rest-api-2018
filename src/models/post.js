import {createByName as Name} from './validators';

export default (sequelize, dataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: dataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: Name('Title')
        .notEmpty()
        .len([1, 25])
        .config,
    },
    body: {
      type: dataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: Name('Body')
        .notEmpty()
        .len([1, 255])
        .config,
    },
  }, {
    tableName: 'Posts',
    underscored: true,
  });
  Post.associate = () => {
    // associations can be defined here
  };
  return Post;
};
