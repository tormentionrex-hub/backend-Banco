'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tarjetas', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      numero_tarjeta: {
        type: Sequelize.STRING(16),
        allowNull: false,
        unique: true,
      },
      tipo: {
        type: Sequelize.ENUM('debito', 'credito'),
        allowNull: false,
      },
      fecha_expiracion: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      limite_credito: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },
      estado: {
        type: Sequelize.ENUM('activa', 'bloqueada', 'cancelada'),
        allowNull: false,
        defaultValue: 'activa',
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
    await queryInterface.dropTable('tarjetas');
  },
};
