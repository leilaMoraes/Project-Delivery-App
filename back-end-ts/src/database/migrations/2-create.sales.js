module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('sales', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      field: 'user_id',
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    sellerId: {
      type: Sequelize.INTEGER,
      field: 'seller_id',
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    totalPrice: {
      type: Sequelize.DECIMAL(9, 2),
      field: 'total_price',
      allowNull: false,
    },
    deliveryAddress: {
      type: Sequelize.STRING,
      field: 'delivery_address',
      allowNull: false,
    },
    deliveryNumber: {
      type: Sequelize.STRING,
      field: 'delivery_number',
      allowNull: false,
    },
    saleDate: {
      type: Sequelize.DATE,
      field: 'sale_date',
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Pending',
    },
  }),
  down: (queryInterface, _Sequelize) => queryInterface.dropTable('sales'),
};
