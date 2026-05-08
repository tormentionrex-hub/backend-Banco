const { Transaccion } = require('../../models');

describe('Transaccion Model', () => {
  it('debería ser válido con datos correctos', async () => {
    const transaccion = Transaccion.build({
      tipo: 'deposito',
      monto_total: 500.00,
      descripcion: 'Deposito inicial'
    });
    
    await expect(transaccion.validate()).resolves.toBeTruthy();
  });

  it('debería fallar si el tipo de transacción no es válido', async () => {
    const transaccion = Transaccion.build({
      tipo: 'invalido',
      monto_total: 500.00
    });

    await expect(transaccion.validate()).rejects.toThrow();
  });

  it('debería fallar si falta el monto total', async () => {
    const transaccion = Transaccion.build({
      tipo: 'deposito'
    });

    await expect(transaccion.validate()).rejects.toThrow();
  });
});
