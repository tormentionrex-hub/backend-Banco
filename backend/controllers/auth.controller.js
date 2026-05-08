const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = db.Usuario;
const Rol = db.Rol;

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 24 * 60 * 60 * 1000
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const usuario = await Usuario.findOne({
      where: { email },
      include: [{ model: Rol, as: 'rol', attributes: ['id', 'nombre'] }]
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Credenciales inválidas' });
    }

    if (usuario.estado !== 'activo') {
      return res.status(403).json({ error: 'Cuenta inactiva o bloqueada' });
    }

    const passwordIsValid = bcrypt.compareSync(password, usuario.password);
    if (!passwordIsValid) {
      // Mismo mensaje genérico para no revelar si el email existe
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id, rolId: usuario.rol_id, rol: usuario.rol.nombre },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '24h' }
    );

    res.cookie('token', token, COOKIE_OPTIONS);

    res.status(200).json({
      message: 'Login exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol.nombre,
        rolId: usuario.rol_id
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token', { ...COOKIE_OPTIONS, maxAge: 0 });
  res.status(200).json({ message: 'Sesión cerrada correctamente' });
};

exports.me = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
      attributes: { exclude: ['password', 'rol_id'] },
      include: [{ model: Rol, as: 'rol', attributes: ['id', 'nombre', 'descripcion'] }]
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const data = usuario.toJSON();
    // Aplanar para que el frontend siga usando usuario.rol como string
    data.rolId = data.rol.id;
    data.rol = data.rol.nombre;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
