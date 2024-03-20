module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true,
    modelName: 'user'
  });

  User.associate = (models) => {
    // Definiera eventuella relationer här till exempel:
    // User.hasMany(models.Order, { as: 'orders' });
  };

  return User;
};
