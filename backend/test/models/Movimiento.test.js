const { Movimiento } = require('../../models');

describe('Movimiento Model', () => {
  it('debería ser válido con datos correctos', async () => {
    const movimiento = Movimiento.build({
      tipo_movimiento: 'credito',
      monto: 100.00,
      transaccion_id: 1,
      cuenta_id: 1
    });
    
    await expect(movimiento.validate()).resolves.toBeTruthy();
  });

  it('debería fallar si el tipo de movimiento no es válido', async () => {
    const movimiento = Movimiento.build({
      tipo_movimiento: 'invalido',
      monto: 100.00,
      transaccion_id: 1,
      cuenta_id: 1
    });

    await expect(movimiento.validate()).rejects.toThrow();
  });

  it('debería fallar si falta el monto', async () => {
    const movimiento = Movimiento.build({
      tipo_movimiento: 'credito',
      transaccion_id: 1,
      cuenta_id: 1
    });

    await expect(movimiento.validate()).rejects.toThrow();
  });
});
