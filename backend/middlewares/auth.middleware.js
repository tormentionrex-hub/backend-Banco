const jwt = require('jsonwebtoken');
const db = require('../models');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ error: 'Acceso denegado: no hay sesión activa' });
  }
  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    next();
  } catch {
    return res.status(401).json({ error: 'Token no válido o expirado' });
  }
};

// Consulta el rol actual desde la BD para que un cambio de rol surta efecto de inmediato
const isAdmin = async (req, res, next) => {
  try {
    const usuario = await db.Usuario.findByPk(req.usuario.id, {
      include: [{ model: db.Rol, as: 'rol', attributes: ['nombre'] }]
    });
    if (!usuario || usuario.rol.nombre !== 'administrador') {
      return res.status(403).json({ error: 'Acceso denegado: se requiere rol de administrador' });
    }
    next();
  } catch {
    return res.status(500).json({ error: 'Error al verificar permisos' });
  }
};

const isAdminOrModerador = async (req, res, next) => {
  try {
    const usuario = await db.Usuario.findByPk(req.usuario.id, {
      include: [{ model: db.Rol, as: 'rol', attributes: ['nombre'] }]
    });
    if (!usuario || !['administrador', 'moderador'].includes(usuario.rol.nombre)) {
      return res.status(403).json({ error: 'Acceso denegado: se requiere rol de administrador o moderador' });
    }
    next();
  } catch {
    return res.status(500).json({ error: 'Error al verificar permisos' });
  }
};

module.exports = { verifyToken, isAdmin, isAdminOrModerador };
