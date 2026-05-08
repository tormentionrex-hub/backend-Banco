const { Tarjeta } = require('../../models');

describe('Tarjeta Model', () => {
  it('debería ser válido con datos correctos', async () => {
    const tarjeta = Tarjeta.build({
      numero_tarjeta: '1234567890123456',
      tipo: 'debito',
      fecha_expiracion: '2030-12-31',
      cuenta_id: 1
    });
    
    await expect(tarjeta.validate()).resolves.toBeTruthy();
  });

  it('debería fallar si el tipo de tarjeta no es válido', async () => {
    const tarjeta = Tarjeta.build({
      numero_tarjeta: '1234567890123456',
      tipo: 'invalido',
      fecha_expiracion: '2030-12-31',
      cuenta_id: 1
    });

    await expect(tarjeta.validate()).rejects.toThrow();
  });

  it('debería fallar si falta la fecha de expiración', async () => {
    const tarjeta = Tarjeta.build({
      numero_tarjeta: '1234567890123456',
      tipo: 'debito',
      cuenta_id: 1
    });

    await expect(tarjeta.validate()).rejects.toThrow();
  });
});
