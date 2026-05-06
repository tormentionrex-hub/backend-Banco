const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'No se proporcionó un token' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'secret_key');
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token no válido o expirado' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.usuario.rol !== 'administrador') {
    return res.status(403).json({ error: 'Acceso denegado: Se requiere rol de administrador' });
  }
  next();
};

module.exports = {
  verifyToken,
  isAdmin
};
