const db = require('./models');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    await db.sequelize.sync();

    // Crear 1 administrador
    await db.Usuario.create({
      nombre: 'Admin',
      apellido: 'Principal',
      email: 'admin@banco.com',
      password: bcrypt.hashSync('admin123', 8),
      dni: '0000000001',
      telefono: '555000001',
      direccion: 'Central Banco',
      rol: 'administrador',
      estado: 'activo'
    });

    // Crear 2 clientes
    await db.Usuario.create({
      nombre: 'Juan',
      apellido: 'Perez',
      email: 'juan@banco.com',
      password: bcrypt.hashSync('cliente123', 8),
      dni: '1234567890',
      telefono: '555123456',
      direccion: 'Av. Principal 123',
      rol: 'cliente',
      estado: 'activo'
    });

    await db.Usuario.create({
      nombre: 'Maria',
      apellido: 'Gomez',
      email: 'maria@banco.com',
      password: bcrypt.hashSync('cliente123', 8),
      dni: '0987654321',
      telefono: '555987654',
      direccion: 'Calle Falsa 123',
      rol: 'cliente',
      estado: 'activo'
    });

    console.log('¡Base de datos poblada con éxito con 3 usuarios!');
    process.exit(0);
  } catch (err) {
    console.error('Error poblando base de datos:', err);
    process.exit(1);
  }
}

seed();
