import api from './api';

export const listarUsuarios = () =>
  api.get('/usuarios');

export const crearUsuario = (datos) =>
  api.post('/usuarios', datos);

export const actualizarRol = (id, rol_id) =>
  api.put(`/usuarios/${id}/rol`, { rol_id });

export const listarRoles = () =>
  api.get('/roles');

export const crearRol = (nombre, descripcion) =>
  api.post('/roles', { nombre, descripcion });
