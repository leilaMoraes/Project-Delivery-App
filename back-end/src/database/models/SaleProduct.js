module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('SalesProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      field: 'sale_id',
      allowNull: false,
      references: {
        model: 'sales',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      field: 'product_id',
      references: {
        model: 'products',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    timestamps: false,
    tableName: 'sales_products',
    underscored: true,
  });
  SalesProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: SalesProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: SalesProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  }
  return SalesProduct;
}
