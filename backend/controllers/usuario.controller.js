const db = require('../models');
const bcrypt = require('bcryptjs');
const Usuario = db.Usuario;
const Rol = db.Rol;

const ROL_INCLUDE = { model: Rol, as: 'rol', attributes: ['id', 'nombre'] };

const formatUsuario = (usuario) => {
  const data = usuario.toJSON();
  if (data.rol) {
    data.rolId = data.rol.id;
    data.rolNombre = data.rol.nombre;
    delete data.rol;
  }
  delete data.password;
  delete data.rol_id;
  return data;
};

exports.createUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, password, dni, telefono, direccion, fecha_nacimiento, rol_id } = req.body;

    if (!nombre || !apellido || !email || !password || !dni) {
      return res.status(400).json({ error: 'Los campos nombre, apellido, email, contraseña y DNI son requeridos' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
    }

    const rolDestino = rol_id || 1; // Por defecto cliente (id=1)
    const rolExiste = await Rol.findByPk(rolDestino);
    if (!rolExiste) {
      return res.status(400).json({ error: 'El rol especificado no existe' });
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    const usuario = await Usuario.create({
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      dni: dni.trim(),
      telefono,
      direccion,
      fecha_nacimiento,
      rol_id: rolDestino
    });

    const usuarioConRol = await Usuario.findByPk(usuario.id, {
      include: [ROL_INCLUDE]
    });

    res.status(201).json(formatUsuario(usuarioConRol));
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'El email o DNI ya están registrados' });
    }
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.errors[0].message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.listUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['password'] },
      include: [ROL_INCLUDE],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(usuarios.map(formatUsuario));
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getUsuario = async (req, res) => {
  try {
    const usuarioSolicitado = parseInt(req.params.id);
    const usuarioActual = req.usuario;

    // Cliente solo puede ver su propio perfil
    if (usuarioActual.rol === 'cliente' && usuarioActual.id !== usuarioSolicitado) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    const usuario = await Usuario.findByPk(usuarioSolicitado, {
      attributes: { exclude: ['password'] },
      include: [ROL_INCLUDE, 'cuentas']
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(formatUsuario(usuario));
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.updateRolUsuario = async (req, res) => {
  try {
    const { rol_id } = req.body;

    if (!rol_id) {
      return res.status(400).json({ error: 'El campo rol_id es requerido' });
    }

    const rolExiste = await Rol.findByPk(rol_id);
    if (!rolExiste) {
      return res.status(400).json({ error: 'El rol especificado no existe' });
    }

    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (usuario.id === req.usuario.id) {
      return res.status(400).json({ error: 'No puedes modificar tu propio rol' });
    }

    await usuario.update({ rol_id });

    const usuarioActualizado = await Usuario.findByPk(usuario.id, {
      include: [ROL_INCLUDE]
    });

    res.status(200).json({
      message: 'Rol actualizado correctamente',
      usuario: formatUsuario(usuarioActualizado)
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
