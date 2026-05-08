'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.bulkInsert('roles', [
      { nombre: 'cliente',        descripcion: 'Usuario estándar con acceso a sus propios datos', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'moderador',      descripcion: 'Puede visualizar la lista de usuarios del sistema', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'administrador',  descripcion: 'Acceso total: gestión de usuarios y roles', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('roles');
  }
};
