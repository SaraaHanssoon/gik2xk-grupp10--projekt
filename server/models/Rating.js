module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    underscored: true,
    modelName: 'rating'
  });

  Rating.associate = (models) => {
    Rating.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  };

  return Rating;
};
