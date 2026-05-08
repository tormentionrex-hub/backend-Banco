import axios from 'axios';
import Swal from 'sweetalert2';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true
});

api.interceptors.response.use(
  res => res,
  err => {
    const url = err.config?.url || '';
    // /auth/* lo maneja ProtectedRoute — no interceptar para evitar bucles
    const esRutaAuth = url.startsWith('/auth/');
    if (err.response?.status === 403 && !esRutaAuth) {
      const msg = err.response.data?.error || 'No tienes permisos para realizar esta acción.';
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: msg,
        confirmButtonColor: '#00338D',
        confirmButtonText: 'Entendido'
      }).then(() => {
        window.location.href = '/';
      });
    }
    return Promise.reject(err);
  }
);

export default api;
