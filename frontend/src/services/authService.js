import api from './api';

export const loginService = (email, password) =>
  api.post('/auth/login', { email, password });

export const logoutService = () =>
  api.post('/auth/logout');

export const getMeService = () =>
  api.get('/auth/me');
