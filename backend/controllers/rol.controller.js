const db = require('../models');
const Rol = db.Rol;

exports.listRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll({ order: [['id', 'ASC']] });
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.createRol = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre del rol es requerido' });
    }

    const nombreLimpio = nombre.trim().toLowerCase();

    if (nombreLimpio.length < 2 || nombreLimpio.length > 50) {
      return res.status(400).json({ error: 'El nombre del rol debe tener entre 2 y 50 caracteres' });
    }

    const rol = await Rol.create({ nombre: nombreLimpio, descripcion });
    res.status(201).json(rol);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Ya existe un rol con ese nombre' });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.updateRol = async (req, res) => {
  try {
    const rol = await Rol.findByPk(req.params.id);
    if (!rol) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }

    // Proteger los roles base del sistema
    const ROLES_SISTEMA = ['cliente', 'moderador', 'administrador'];
    if (ROLES_SISTEMA.includes(rol.nombre)) {
      return res.status(403).json({ error: 'Los roles del sistema no pueden modificarse' });
    }

    const { descripcion } = req.body;
    await rol.update({ descripcion });

    res.status(200).json({ message: 'Rol actualizado', rol });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
