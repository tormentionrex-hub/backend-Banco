'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('prestamos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      monto_solicitado: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      monto_aprobado: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },
      tasa_interes: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      plazo_meses: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cuota_mensual: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },
      estado: {
        type: Sequelize.ENUM('solicitado', 'aprobado', 'rechazado', 'activo', 'pagado'),
        allowNull: false,
        defaultValue: 'solicitado',
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
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
    await queryInterface.dropTable('prestamos');
  },
};
