import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logoBanco from '../../images/LogoBanco.png';
import './Navbar.css';

const Navbar = () => {
  const [activeSegment, setActiveSegment] = useState('Personas');
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar-bcr">
      <div className="navbar-top-level">
        <div className="container top-container">
          <div className="top-left-group">
            <Link to="/">
              <img src={logoBanco} alt="BCR Logo" className="bcr-main-logo" />
            </Link>
            <div className="vertical-divider">|</div>
            <div className="segments-links">
              {['Personas', 'Pagos', 'Empresas', 'Nosotros'].map(seg => (
                <span
                  key={seg}
                  className={activeSegment === seg ? 'active' : ''}
                  onClick={() => setActiveSegment(seg)}
                >
                  {seg}
                </span>
              ))}
            </div>
          </div>

          <div className="top-right-group">
            <button className="btn-outline-bcr">SOLICITUDES EN LINEA</button>
            {usuario ? (
              <>
                <Link to="/dashboard" className="btn-navy-bcr">MI CUENTA</Link>
                <button className="btn-light-blue-bcr" onClick={handleLogout}>SALIR</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-navy-bcr">LOGIN</Link>
                <Link to="/register" className="btn-light-blue-bcr">REGISTER</Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="navbar-bottom-level">
        <div className="container bottom-container">
          <div className="product-links">
            <a href="#">Cuentas</a>
            <a href="#">Tarjetas</a>
            <a href="#">Préstamos</a>
            <a href="#">Puntos Tucán</a>
            <a href="#">Servicios</a>
            <a href="#">Inversiones</a>
            <a href="#" className="promo-tag">Promociones</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
