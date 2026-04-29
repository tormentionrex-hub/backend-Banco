'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movimientos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      tipo_movimiento: {
        type: Sequelize.ENUM('debito', 'credito'),
        allowNull: false,
      },
      monto: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      transaccion_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'transacciones',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      cuenta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cuentas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
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
    await queryInterface.dropTable('movimientos');
  },
};
