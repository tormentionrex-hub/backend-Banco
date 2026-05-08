'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Agregar columna rol_id (nullable primero para poder llenarla)
    await queryInterface.addColumn('usuarios', 'rol_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'roles', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });

    // 2. Asignar rol_id basado en el valor actual de la columna rol
    await queryInterface.sequelize.query(`
      UPDATE usuarios u
      JOIN roles r ON r.nombre = u.rol
      SET u.rol_id = r.id
    `);

    // 3. Ahora hacerla NOT NULL con la restricción FK
    await queryInterface.changeColumn('usuarios', 'rol_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'roles', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });

    // 4. Eliminar la columna rol (ENUM ya no es necesaria)
    await queryInterface.removeColumn('usuarios', 'rol');
  },

  async down(queryInterface, Sequelize) {
    // Revertir: recrear columna rol ENUM
    await queryInterface.addColumn('usuarios', 'rol', {
      type: Sequelize.ENUM('cliente', 'moderador', 'administrador'),
      allowNull: false,
      defaultValue: 'cliente'
    });

    // Restaurar valores desde rol_id
    await queryInterface.sequelize.query(`
      UPDATE usuarios u
      JOIN roles r ON r.id = u.rol_id
      SET u.rol = r.nombre
    `);

    // Eliminar rol_id
    await queryInterface.removeColumn('usuarios', 'rol_id');
  }
};
