const db = require('./models');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    // Obtener los IDs de roles desde la tabla roles
    const roles = await db.Rol.findAll();
    const rolMap = {};
    roles.forEach(r => { rolMap[r.nombre] = r.id; });

    if (!rolMap.administrador || !rolMap.moderador || !rolMap.cliente) {
      console.error('Error: Los roles base no existen. Ejecuta las migraciones primero.');
      process.exit(1);
    }

    await db.Usuario.bulkCreate([
      {
        nombre: 'Admin',
        apellido: 'Principal',
        email: 'admin@banco.com',
        password: bcrypt.hashSync('admin123', 12),
        dni: '0000000001',
        telefono: '555000001',
        direccion: 'Central Banco',
        rol_id: rolMap.administrador,
        estado: 'activo'
      },
      {
        nombre: 'Moderador',
        apellido: 'Sistema',
        email: 'moderador@banco.com',
        password: bcrypt.hashSync('mod12345', 12),
        dni: '5555555555',
        telefono: '555000002',
        direccion: 'Oficina Central',
        rol_id: rolMap.moderador,
        estado: 'activo'
      },
      {
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan@banco.com',
        password: bcrypt.hashSync('cliente123', 12),
        dni: '1234567890',
        telefono: '555123456',
        direccion: 'Av. Principal 123',
        rol_id: rolMap.cliente,
        estado: 'activo'
      }
    ], { ignoreDuplicates: true });

    console.log('Base de datos poblada correctamente.');
    process.exit(0);
  } catch (err) {
    console.error('Error en seed:', err.message);
    process.exit(1);
  }
}

seed();
