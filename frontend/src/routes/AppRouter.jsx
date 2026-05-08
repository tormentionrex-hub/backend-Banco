import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Inicio from '../pages/Inicio/Inicio';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import AdminUsuarios from '../pages/Admin/AdminUsuarios';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={['administrador', 'moderador']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/usuarios"
          element={
            <ProtectedRoute roles={['administrador', 'moderador']}>
              <AdminUsuarios />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
