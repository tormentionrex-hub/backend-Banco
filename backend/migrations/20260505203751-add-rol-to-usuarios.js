'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 'rol', {
      type: Sequelize.ENUM('cliente', 'administrador'),
      allowNull: false,
      defaultValue: 'cliente',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuarios', 'rol');
  }
};
