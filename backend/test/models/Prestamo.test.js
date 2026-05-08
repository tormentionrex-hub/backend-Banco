const { Prestamo } = require('../../models');

describe('Prestamo Model', () => {
  it('debería ser válido con datos correctos', async () => {
    const prestamo = Prestamo.build({
      monto_solicitado: 5000.00,
      tasa_interes: 5.5,
      plazo_meses: 12,
      usuario_id: 1,
      cuenta_id: 1
    });
    
    await expect(prestamo.validate()).resolves.toBeTruthy();
  });

  it('debería fallar si falta el monto solicitado', async () => {
    const prestamo = Prestamo.build({
      tasa_interes: 5.5,
      plazo_meses: 12,
      usuario_id: 1,
      cuenta_id: 1
    });

    await expect(prestamo.validate()).rejects.toThrow();
  });

  it('debería fallar si falta la tasa de interés', async () => {
    const prestamo = Prestamo.build({
      monto_solicitado: 5000.00,
      plazo_meses: 12,
      usuario_id: 1,
      cuenta_id: 1
    });

    await expect(prestamo.validate()).rejects.toThrow();
  });
});
