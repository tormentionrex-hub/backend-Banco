const db = require('../models');
const { Cuenta, Transaccion, Movimiento } = db;
const sequelize = db.sequelize;

exports.deposito = async (req, res) => {
  const { cuenta_id, monto } = req.body;

  if (monto <= 0) return res.status(400).json({ error: 'Monto debe ser mayor a cero' });

  const t = await sequelize.transaction();

  try {
    const cuenta = await Cuenta.findByPk(cuenta_id, { transaction: t });
    if (!cuenta) throw new Error('Cuenta no encontrada');

    cuenta.saldo = parseFloat(cuenta.saldo) + parseFloat(monto);
    await cuenta.save({ transaction: t });

    const transaccion = await Transaccion.create({
      tipo: 'deposito',
      monto_total: monto,
      estado: 'completada'
    }, { transaction: t });

    await Movimiento.create({
      cuenta_id,
      transaccion_id: transaccion.id,
      tipo_movimiento: 'credito',
      monto,
      saldo_posterior: cuenta.saldo
    }, { transaction: t });

    await t.commit();
    res.status(200).json({ message: 'Depósito exitoso', saldo_actual: cuenta.saldo });
  } catch (error) {
    await t.rollback();
    res.status(400).json({ error: error.message });
  }
};

exports.retiro = async (req, res) => {
  const { cuenta_id, monto } = req.body;

  if (monto <= 0) return res.status(400).json({ error: 'Monto debe ser mayor a cero' });

  const t = await sequelize.transaction();

  try {
    const cuenta = await Cuenta.findByPk(cuenta_id, { transaction: t });
    if (!cuenta) throw new Error('Cuenta no encontrada');

    if (parseFloat(cuenta.saldo) < parseFloat(monto)) {
      throw new Error('Fondos insuficientes');
    }

    cuenta.saldo = parseFloat(cuenta.saldo) - parseFloat(monto);
    await cuenta.save({ transaction: t });

    const transaccion = await Transaccion.create({
      tipo: 'retiro',
      monto_total: monto,
      estado: 'completada'
    }, { transaction: t });

    await Movimiento.create({
      cuenta_id,
      transaccion_id: transaccion.id,
      tipo_movimiento: 'debito',
      monto,
      saldo_posterior: cuenta.saldo
    }, { transaction: t });

    await t.commit();
    res.status(200).json({ message: 'Retiro exitoso', saldo_actual: cuenta.saldo });
  } catch (error) {
    await t.rollback();
    res.status(400).json({ error: error.message });
  }
};

exports.transferencia = async (req, res) => {
  const { cuenta_origen_id, cuenta_destino_id, monto } = req.body;

  if (monto <= 0) return res.status(400).json({ error: 'Monto debe ser mayor a cero' });
  if (cuenta_origen_id === cuenta_destino_id) return res.status(400).json({ error: 'Misma cuenta origen y destino' });

  const t = await sequelize.transaction();

  try {
    const cuentaOrigen = await Cuenta.findByPk(cuenta_origen_id, { transaction: t });
    const cuentaDestino = await Cuenta.findByPk(cuenta_destino_id, { transaction: t });

    if (!cuentaOrigen) throw new Error('Cuenta origen no encontrada');
    if (!cuentaDestino) throw new Error('Cuenta destino no encontrada');

    if (parseFloat(cuentaOrigen.saldo) < parseFloat(monto)) {
      throw new Error('Fondos insuficientes en cuenta de origen');
    }

    cuentaOrigen.saldo = parseFloat(cuentaOrigen.saldo) - parseFloat(monto);
    await cuentaOrigen.save({ transaction: t });

    cuentaDestino.saldo = parseFloat(cuentaDestino.saldo) + parseFloat(monto);
    await cuentaDestino.save({ transaction: t });

    const transaccion = await Transaccion.create({
      tipo: 'transferencia',
      monto_total: monto,
      estado: 'completada'
    }, { transaction: t });

    await Movimiento.create({
      cuenta_id: cuentaOrigen.id,
      transaccion_id: transaccion.id,
      tipo_movimiento: 'debito',
      monto,
      saldo_posterior: cuentaOrigen.saldo
    }, { transaction: t });

    await Movimiento.create({
      cuenta_id: cuentaDestino.id,
      transaccion_id: transaccion.id,
      tipo_movimiento: 'credito',
      monto,
      saldo_posterior: cuentaDestino.saldo
    }, { transaction: t });

    await t.commit();
    res.status(200).json({ message: 'Transferencia exitosa' });
  } catch (error) {
    await t.rollback();
    res.status(400).json({ error: error.message });
  }
};
