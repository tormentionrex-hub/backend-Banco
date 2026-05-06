'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transacciones', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.ENUM('deposito', 'retiro', 'transferencia'),
        allowNull: false,
      },
      monto_total: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      estado: {
        type: Sequelize.ENUM('pendiente', 'completada', 'fallida'),
        allowNull: false,
        defaultValue: 'pendiente',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('transacciones');
  },
};
