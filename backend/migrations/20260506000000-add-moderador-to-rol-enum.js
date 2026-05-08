'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE usuarios MODIFY COLUMN rol ENUM('cliente', 'moderador', 'administrador') NOT NULL DEFAULT 'cliente'"
    );
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE usuarios MODIFY COLUMN rol ENUM('cliente', 'administrador') NOT NULL DEFAULT 'cliente'"
    );
  }
};
