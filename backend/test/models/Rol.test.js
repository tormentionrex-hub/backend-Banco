const { Rol } = require('../../models');

describe('Rol Model', () => {
  it('debería ser válido con datos correctos', async () => {
    const rol = Rol.build({
      nombre: 'administrador',
      descripcion: 'Administrador del sistema'
    });
    
    await expect(rol.validate()).resolves.toBeTruthy();
  });

  it('debería fallar si el nombre es demasiado corto', async () => {
    const rol = Rol.build({
      nombre: 'a',
      descripcion: 'Rol con nombre corto'
    });

    await expect(rol.validate()).rejects.toThrow();
  });

  it('debería fallar si falta el nombre', async () => {
    const rol = Rol.build({
      descripcion: 'Rol sin nombre'
    });

    await expect(rol.validate()).rejects.toThrow();
  });
});
