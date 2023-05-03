module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('products', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: Sequelize.DECIMAL(4, 2),
      allowNull: false,
    },
    urlImage: {
      type: Sequelize.STRING,
      field: 'url_image',
      allowNull: false,
      defaultValue: '',
    },
  }),
  down: (queryInterface, _Sequelize) => queryInterface.dropTable('products'),
};
