const { PagoPrestamo } = require('../../models');

describe('PagoPrestamo Model', () => {
  it('debería ser válido con datos correctos', async () => {
    const pago = PagoPrestamo.build({
      monto_pagado: 500.00,
      numero_cuota: 1,
      fecha_pago: new Date(),
      prestamo_id: 1
    });
    
    await expect(pago.validate()).resolves.toBeTruthy();
  });

  it('debería fallar si falta el monto pagado', async () => {
    const pago = PagoPrestamo.build({
      numero_cuota: 1,
      fecha_pago: new Date(),
      prestamo_id: 1
    });

    await expect(pago.validate()).rejects.toThrow();
  });

  it('debería fallar si falta el número de cuota', async () => {
    const pago = PagoPrestamo.build({
      monto_pagado: 500.00,
      fecha_pago: new Date(),
      prestamo_id: 1
    });

    await expect(pago.validate()).rejects.toThrow();
  });
});
