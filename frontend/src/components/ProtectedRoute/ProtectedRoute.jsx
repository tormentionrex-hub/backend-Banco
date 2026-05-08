import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';

// estados posibles: 'verificando' | 'permitido' | 'sin-sesion' | 'sin-permiso'
const ProtectedRoute = ({ children, roles }) => {
  const { usuario, cargando, refreshUsuario } = useAuth();
  const [estado, setEstado] = useState(roles ? 'verificando' : 'permitido');

  useEffect(() => {
    if (!roles) return;

    refreshUsuario().then(usuarioActual => {
      if (!usuarioActual) {
        setEstado('sin-sesion');
      } else if (!roles.includes(usuarioActual.rol)) {
        Swal.fire({
          icon: 'error',
          title: 'Acceso denegado',
          text: 'No tienes permisos para acceder a esta sección.',
          confirmButtonColor: '#00338D',
          confirmButtonText: 'Entendido'
        }).then(() => setEstado('sin-permiso'));
      } else {
        setEstado('permitido');
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (cargando || estado === 'verificando') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <p style={{ color: '#00338D', fontSize: '18px' }}>Verificando sesión...</p>
      </div>
    );
  }

  if (estado === 'sin-sesion' || !usuario) return <Navigate to="/login" replace />;
  if (estado === 'sin-permiso') return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
