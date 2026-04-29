'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pagos_prestamo', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      monto_pagado: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      numero_cuota: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fecha_pago: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      estado: {
        type: Sequelize.ENUM('pagado', 'pendiente', 'vencido'),
        allowNull: false,
        defaultValue: 'pendiente',
      },
      prestamo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'prestamos',
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
    await queryInterface.dropTable('pagos_prestamo');
  },
};
