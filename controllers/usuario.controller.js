const db = require('../models');
const Usuario = db.Usuario;

exports.createUsuario = async (req, res) => {
  try {
    const bcrypt = require('bcryptjs');
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    const usuarioData = { ...req.body, password: hashedPassword };
    const usuario = await Usuario.create(usuarioData);
    
    // Evitamos devolver la contraseña
    const usuarioSinPassword = usuario.toJSON();
    delete usuarioSinPassword.password;

    res.status(201).json(usuarioSinPassword);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      include: ['cuentas']
    });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
