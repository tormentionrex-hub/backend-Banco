import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const ROL_ETIQUETAS = {
  administrador: 'Administrador',
  moderador: 'Moderador',
  cliente: 'Cliente'
};

const Dashboard = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* SIDEBAR LATERAL */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-profile">
          <img 
            src="https://play-lh.googleusercontent.com/YbqEETD_H3qJanIFk8BzRP_jXEnJTPG9zmYEJyKwdTNMd34GHVZRyV8eOMbOQqhn3f0" 
            alt="Profile" 
            className="profile-avatar-img" 
          />
          <span className="profile-name">{usuario.nombre} {usuario.apellido}</span>
          <span className="profile-role-tag">{ROL_ETIQUETAS[usuario.rol]}</span>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item active">Panel Principal</Link>
          {(usuario.rol === 'administrador' || usuario.rol === 'moderador') && (
            <Link to="/admin/usuarios" className="nav-item">Gestión de Usuarios</Link>
          )}
          <button className="nav-item btn-sidebar-logout" onClick={handleLogout}>Cerrar Sesión</button>
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="dashboard-content">
        <header className="content-header">
          <div className="breadcrumbs">
            <Link to="/">Inicio</Link> <span>&gt;</span> <Link to="/dashboard">Panel</Link>
          </div>
          <div className="header-actions">
            <span className="current-date">Hoy: {new Date().toLocaleDateString('es-CR')}</span>
          </div>
        </header>

        <section className="content-body">
          {/* BANNER DE BIENVENIDA */}
          <div className="welcome-banner">
            <div className="welcome-text">
              <h2>¡Bienvenido de nuevo, {usuario.nombre}!</h2>
              <p>Has ingresado correctamente al Sistema Bancario BCR. Desde aquí puedes gestionar tu cuenta y configuraciones.</p>
            </div>
            <div className="welcome-img">
              {/* Aquí iría una ilustración corporativa */}
            </div>
          </div>

          {/* TARJETAS DE INFORMACIÓN */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Nombre Completo</div>
              <div className="stat-value">{usuario.nombre} {usuario.apellido}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Correo Electrónico</div>
              <div className="stat-value">{usuario.email}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Rol en el Sistema</div>
              <div className="stat-value">{ROL_ETIQUETAS[usuario.rol]}</div>
            </div>
          </div>

          {/* ACCESOS ADMINISTRATIVOS */}
          {(usuario.rol === 'administrador' || usuario.rol === 'moderador') && (
            <div className="admin-actions-section">
              <h3 className="section-title">Administración del Sistema</h3>
              <div className="admin-grid">
                <Link to="/admin/usuarios" className="admin-card">
                  <h4>Gestión de Usuarios</h4>
                  <p>
                    {usuario.rol === 'administrador'
                      ? 'Crea, visualiza y gestiona todos los roles y permisos de los usuarios del sistema.'
                      : 'Visualiza la lista de usuarios registrados y su información básica.'}
                  </p>
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
