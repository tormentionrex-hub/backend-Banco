import { createContext, useContext, useState, useEffect } from 'react';
import { getMeService, logoutService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    getMeService()
      .then(res => setUsuario(res.data))
      .catch(() => setUsuario(null))
      .finally(() => setCargando(false));
  }, []);

  const login = (usuarioData) => setUsuario(usuarioData);

  const logout = async () => {
    try {
      await logoutService();
    } finally {
      setUsuario(null);
    }
  };

  // Consulta la BD y actualiza el contexto con el rol actual
  const refreshUsuario = async () => {
    try {
      const res = await getMeService();
      setUsuario(res.data);
      return res.data;
    } catch {
      setUsuario(null);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, logout, refreshUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
