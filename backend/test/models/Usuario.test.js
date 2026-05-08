const { Usuario } = require('../../models');

describe('Usuario Model', () => {
  it('debería ser válido con datos correctos', async () => {
    const usuario = Usuario.build({
      nombre: 'Juan',
      apellido: 'Perez',
      email: 'juan.perez@example.com',
      password: 'hashed_password',
      dni: '12345678',
      rol_id: 1
    });
    
    await expect(usuario.validate()).resolves.toBeTruthy();
  });

  it('debería fallar si el email no es válido', async () => {
    const usuario = Usuario.build({
      nombre: 'Juan',
      apellido: 'Perez',
      email: 'email-invalido',
      password: 'hashed_password',
      dni: '12345678',
      rol_id: 1
    });

    await expect(usuario.validate()).rejects.toThrow();
  });

  it('debería fallar si falta un campo requerido (nombre)', async () => {
    const usuario = Usuario.build({
      apellido: 'Perez',
      email: 'juan.perez@example.com',
      password: 'hashed_password',
      dni: '12345678',
      rol_id: 1
    });

    await expect(usuario.validate()).rejects.toThrow();
  });
});
