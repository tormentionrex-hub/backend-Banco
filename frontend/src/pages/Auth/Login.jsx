import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginService } from '../../services/authService';
import logo from '../../images/Logo-BCR-Blanco-EDITABLE-CURVAS.png';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);
    try {
      const res = await loginService(email, password);
      login(res.data.usuario);
      const rol = res.data.usuario.rol;
      navigate(rol === 'administrador' || rol === 'moderador' ? '/dashboard' : '/');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión. Intente de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-page">
      {/* HEADER DE NAVEGACIÓN */}
      <nav className="auth-nav">
        <div className="auth-nav-left">
          <Link to="/">
            <img src={logo} alt="BCR Logo" className="auth-nav-logo" />
          </Link>
        </div>
        <div className="auth-nav-links">
          <Link to="/">Home</Link>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
          <Link to="/login" className="btn-nav-login">Login</Link>
        </div>
      </nav>

      <div className="auth-card">
        <Link to="/" className="close-btn">×</Link>
        <h2>Login</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={cargando}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={cargando}
            />
          </div>

          <div className="auth-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="btn-auth" disabled={cargando}>
            {cargando ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
