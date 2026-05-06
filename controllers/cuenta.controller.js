const db = require('../models');
const Cuenta = db.Cuenta;

exports.createCuenta = async (req, res) => {
  try {
    if (!req.body.usuario_id) {
        return res.status(400).json({ error: 'usuario_id is required' });
    }
    const cuenta = await Cuenta.create(req.body);
    res.status(201).json(cuenta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCuenta = async (req, res) => {
  try {
    const cuenta = await Cuenta.findByPk(req.params.id, {
      include: ['movimientos', 'tarjetas']
    });
    if (!cuenta) {
      return res.status(404).json({ error: 'Cuenta no encontrada' });
    }
    res.status(200).json(cuenta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
