module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // Notera: productId tas bort från här då det kommer hanteras genom association
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    underscored: true,
    modelName: 'cart'
  });

  Cart.associate = (models) => {
    Cart.belongsToMany(models.Product, { through: 'CartProduct' });
  };

  return Cart;
};
