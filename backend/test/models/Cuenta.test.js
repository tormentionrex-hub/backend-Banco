const { Cuenta } = require('../../models');

describe('Cuenta Model', () => {
  it('debería ser válido con datos correctos', async () => {
    const cuenta = Cuenta.build({
      numero_cuenta: '1234567890',
      tipo_cuenta: 'ahorro',
      saldo: 1000.00,
      moneda: 'USD',
      usuario_id: 1
    });
    
    await expect(cuenta.validate()).resolves.toBeTruthy();
  });

  it('debería fallar si el tipo de cuenta no es válido', async () => {
    const cuenta = Cuenta.build({
      numero_cuenta: '1234567890',
      tipo_cuenta: 'invalido',
      saldo: 1000.00,
      usuario_id: 1
    });

    await expect(cuenta.validate()).rejects.toThrow();
  });

  it('debería fallar si falta el número de cuenta', async () => {
    const cuenta = Cuenta.build({
      tipo_cuenta: 'ahorro',
      saldo: 1000.00,
      usuario_id: 1
    });

    await expect(cuenta.validate()).rejects.toThrow();
  });
});
