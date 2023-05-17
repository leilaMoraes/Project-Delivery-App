module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sales_products', {
      saleId: {
        type: Sequelize.INTEGER,
        field: 'sale_id',
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'sales',
          key: 'id'
        }
      },
      productId: {
        type: Sequelize.INTEGER,
        field: 'product_id',
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'products',
          key: 'id'
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('sales_products');
  }
};

