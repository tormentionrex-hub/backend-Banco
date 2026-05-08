import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { listarUsuarios, crearUsuario, actualizarRol, listarRoles, crearRol } from '../../services/usuarioService';
import './Admin.css';

const FORM_INICIAL = {
  nombre: '', apellido: '', email: '',
  password: '', dni: '', telefono: '', rol_id: ''
};

const FORM_ROL_INICIAL = { nombre: '', descripcion: '' };

const ESTADO_ESTILOS = {
  activo:   'estado-activo',
  inactivo: 'estado-inactivo',
  bloqueado:'estado-bloqueado'
};

const AdminUsuarios = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const esAdmin = usuario.rol === 'administrador';

  // Datos
  const [usuarios, setUsuarios]   = useState([]);
  const [roles, setRoles]         = useState([]);
  const [cargando, setCargando]   = useState(true);
  const [errorTabla, setErrorTabla] = useState('');

  // Panel activo: 'usuarios' | 'roles'
  const [panel, setPanel] = useState('usuarios');

  // Formulario crear usuario
  const [mostrarFormUsuario, setMostrarFormUsuario] = useState(false);
  const [formUsuario, setFormUsuario] = useState(FORM_INICIAL);
  const [errorFormUsuario, setErrorFormUsuario] = useState('');
  const [exitoFormUsuario, setExitoFormUsuario] = useState('');
  const [enviandoUsuario, setEnviandoUsuario] = useState(false);

  // Formulario crear rol
  const [mostrarFormRol, setMostrarFormRol] = useState(false);
  const [formRol, setFormRol] = useState(FORM_ROL_INICIAL);
  const [errorFormRol, setErrorFormRol] = useState('');
  const [exitoFormRol, setExitoFormRol] = useState('');
  const [enviandoRol, setEnviandoRol] = useState(false);

  // Estado de cambio de rol por fila
  const [cambiandoRol, setCambiandoRol] = useState({});

  const cargarDatos = async () => {
    setCargando(true);
    setErrorTabla('');
    try {
      const [resUsuarios, resRoles] = await Promise.all([listarUsuarios(), listarRoles()]);
      setUsuarios(resUsuarios.data);
      setRoles(resRoles.data);
      // Preseleccionar rol por defecto en formulario
      const rolCliente = resRoles.data.find(r => r.nombre === 'cliente');
      if (rolCliente) setFormUsuario(prev => ({ ...prev, rol_id: rolCliente.id }));
    } catch (err) {
      setErrorTabla(err.response?.data?.error || 'Error al cargar datos');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargarDatos(); }, []);

  // --- Crear usuario ---
  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    setErrorFormUsuario('');
    setExitoFormUsuario('');
    setEnviandoUsuario(true);
    try {
      await crearUsuario({ ...formUsuario, rol_id: Number(formUsuario.rol_id) });
      setExitoFormUsuario(`Usuario ${formUsuario.nombre} ${formUsuario.apellido} creado correctamente`);
      const rolCliente = roles.find(r => r.nombre === 'cliente');
      setFormUsuario({ ...FORM_INICIAL, rol_id: rolCliente?.id || '' });
      setMostrarFormUsuario(false);
      cargarDatos();
    } catch (err) {
      setErrorFormUsuario(err.response?.data?.error || 'Error al crear el usuario');
    } finally {
      setEnviandoUsuario(false);
    }
  };

  // --- Cambiar rol de usuario ---
  const handleCambiarRol = async (id, nuevoRolId) => {
    setCambiandoRol(prev => ({ ...prev, [id]: true }));
    try {
      await actualizarRol(id, Number(nuevoRolId));
      setUsuarios(prev =>
        prev.map(u => u.id === id ? { ...u, rolId: Number(nuevoRolId), rolNombre: roles.find(r => r.id === Number(nuevoRolId))?.nombre } : u)
      );
    } catch (err) {
      alert(err.response?.data?.error || 'Error al actualizar el rol');
    } finally {
      setCambiandoRol(prev => ({ ...prev, [id]: false }));
    }
  };

  // --- Crear rol ---
  const handleCrearRol = async (e) => {
    e.preventDefault();
    setErrorFormRol('');
    setExitoFormRol('');
    setEnviandoRol(true);
    try {
      await crearRol(formRol.nombre, formRol.descripcion);
      setExitoFormRol(`Rol "${formRol.nombre}" creado correctamente`);
      setFormRol(FORM_ROL_INICIAL);
      setMostrarFormRol(false);
      cargarDatos();
    } catch (err) {
      setErrorFormRol(err.response?.data?.error || 'Error al crear el rol');
    } finally {
      setEnviandoRol(false);
    }
  };

  const handleLogout = async () => { await logout(); navigate('/login'); };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-header-left">
            <Link to="/dashboard" className="admin-back">← Panel</Link>
            <h1>Administración</h1>
          </div>
          <div className="admin-header-right">
            <span className={`rol-badge rol-${usuario.rol}`}>{usuario.rol}</span>
            <span className="user-name">{usuario.nombre} {usuario.apellido}</span>
            <button className="btn-logout" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        {/* TABS */}
        <div className="admin-tabs">
          <button
            className={`admin-tab ${panel === 'usuarios' ? 'active' : ''}`}
            onClick={() => setPanel('usuarios')}
          >
            Usuarios
          </button>
          {esAdmin && (
            <button
              className={`admin-tab ${panel === 'roles' ? 'active' : ''}`}
              onClick={() => setPanel('roles')}
            >
              Roles
            </button>
          )}
        </div>

        {/* ==================== PANEL USUARIOS ==================== */}
        {panel === 'usuarios' && (
          <>
            <div className="admin-toolbar">
              <div>
                <h2>Usuarios registrados</h2>
                <p className="admin-subtitle">
                  {esAdmin
                    ? 'Puedes crear nuevos usuarios y gestionar sus roles.'
                    : 'Vista de solo lectura. El moderador no puede crear ni modificar usuarios.'}
                </p>
              </div>
              {esAdmin && (
                <button className="btn-primary" onClick={() => { setMostrarFormUsuario(!mostrarFormUsuario); setErrorFormUsuario(''); setExitoFormUsuario(''); }}>
                  {mostrarFormUsuario ? 'Cancelar' : '+ Nuevo usuario'}
                </button>
              )}
            </div>

            {exitoFormUsuario && <div className="alert-success">{exitoFormUsuario}</div>}

            {mostrarFormUsuario && esAdmin && (
              <div className="form-card">
                <h3>Crear nuevo usuario</h3>
                <form className="create-form" onSubmit={handleCrearUsuario}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nombre *</label>
                      <input name="nombre" value={formUsuario.nombre} onChange={e => setFormUsuario(p => ({ ...p, nombre: e.target.value }))} placeholder="Juan" required />
                    </div>
                    <div className="form-group">
                      <label>Apellido *</label>
                      <input name="apellido" value={formUsuario.apellido} onChange={e => setFormUsuario(p => ({ ...p, apellido: e.target.value }))} placeholder="Pérez" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Correo electrónico *</label>
                      <input type="email" value={formUsuario.email} onChange={e => setFormUsuario(p => ({ ...p, email: e.target.value }))} placeholder="juan@bcr.com" required />
                    </div>
                    <div className="form-group">
                      <label>Contraseña * (mín. 8 caracteres)</label>
                      <input type="password" value={formUsuario.password} onChange={e => setFormUsuario(p => ({ ...p, password: e.target.value }))} placeholder="••••••••" required minLength={8} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>DNI *</label>
                      <input value={formUsuario.dni} onChange={e => setFormUsuario(p => ({ ...p, dni: e.target.value }))} placeholder="123456789" required />
                    </div>
                    <div className="form-group">
                      <label>Teléfono</label>
                      <input value={formUsuario.telefono} onChange={e => setFormUsuario(p => ({ ...p, telefono: e.target.value }))} placeholder="8888-8888" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Rol *</label>
                      <select value={formUsuario.rol_id} onChange={e => setFormUsuario(p => ({ ...p, rol_id: e.target.value }))} required>
                        <option value="">Seleccione un rol</option>
                        {roles.map(r => (
                          <option key={r.id} value={r.id}>{r.nombre}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {errorFormUsuario && <div className="alert-error">{errorFormUsuario}</div>}
                  <div className="form-actions">
                    <button type="submit" className="btn-primary" disabled={enviandoUsuario}>
                      {enviandoUsuario ? 'Creando...' : 'Crear usuario'}
                    </button>
                    <button type="button" className="btn-secondary" onClick={() => setMostrarFormUsuario(false)}>Cancelar</button>
                  </div>
                </form>
              </div>
            )}

            <div className="table-card">
              {cargando ? (
                <p className="table-loading">Cargando usuarios...</p>
              ) : errorTabla ? (
                <p className="alert-error" style={{ margin: '20px' }}>{errorTabla}</p>
              ) : (
                <div className="table-wrapper">
                  <table className="usuarios-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>DNI</th>
                        <th>Estado</th>
                        <th>Rol (ID)</th>
                        {esAdmin && <th>Cambiar rol</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {usuarios.map(u => (
                        <tr key={u.id} className={u.id === usuario.id ? 'row-current-user' : ''}>
                          <td>{u.id}</td>
                          <td>
                            {u.nombre} {u.apellido}
                            {u.id === usuario.id && <span className="current-label"> (tú)</span>}
                          </td>
                          <td>{u.email}</td>
                          <td>{u.dni}</td>
                          <td>
                            <span className={`estado-badge ${ESTADO_ESTILOS[u.estado] || ''}`}>
                              {u.estado}
                            </span>
                          </td>
                          <td>
                            <span className={`rol-badge rol-${u.rolNombre}`}>{u.rolNombre}</span>
                            <span className="rol-id-tag">ID: {u.rolId}</span>
                          </td>
                          {esAdmin && (
                            <td>
                              {u.id === usuario.id ? (
                                <span className="no-change">—</span>
                              ) : (
                                <select
                                  value={u.rolId}
                                  onChange={e => handleCambiarRol(u.id, e.target.value)}
                                  disabled={cambiandoRol[u.id]}
                                  className="rol-select"
                                >
                                  {roles.map(r => (
                                    <option key={r.id} value={r.id}>{r.nombre}</option>
                                  ))}
                                </select>
                              )}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {usuarios.length === 0 && <p className="table-empty">No hay usuarios registrados.</p>}
                </div>
              )}
            </div>
          </>
        )}

        {/* ==================== PANEL ROLES ==================== */}
        {panel === 'roles' && esAdmin && (
          <>
            <div className="admin-toolbar">
              <div>
                <h2>Roles del sistema</h2>
                <p className="admin-subtitle">Los roles base (cliente, moderador, administrador) son del sistema y no se pueden eliminar.</p>
              </div>
              <button className="btn-primary" onClick={() => { setMostrarFormRol(!mostrarFormRol); setErrorFormRol(''); setExitoFormRol(''); }}>
                {mostrarFormRol ? 'Cancelar' : '+ Nuevo rol'}
              </button>
            </div>

            {exitoFormRol && <div className="alert-success">{exitoFormRol}</div>}

            {mostrarFormRol && (
              <div className="form-card">
                <h3>Crear nuevo rol</h3>
                <form className="create-form" onSubmit={handleCrearRol}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nombre del rol *</label>
                      <input value={formRol.nombre} onChange={e => setFormRol(p => ({ ...p, nombre: e.target.value }))} placeholder="supervisor" required />
                    </div>
                    <div className="form-group">
                      <label>Descripción</label>
                      <input value={formRol.descripcion} onChange={e => setFormRol(p => ({ ...p, descripcion: e.target.value }))} placeholder="Descripción del rol" />
                    </div>
                  </div>
                  {errorFormRol && <div className="alert-error">{errorFormRol}</div>}
                  <div className="form-actions">
                    <button type="submit" className="btn-primary" disabled={enviandoRol}>
                      {enviandoRol ? 'Creando...' : 'Crear rol'}
                    </button>
                    <button type="button" className="btn-secondary" onClick={() => setMostrarFormRol(false)}>Cancelar</button>
                  </div>
                </form>
              </div>
            )}

            <div className="table-card">
              {cargando ? (
                <p className="table-loading">Cargando roles...</p>
              ) : (
                <div className="table-wrapper">
                  <table className="usuarios-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Tipo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roles.map(r => {
                        const esSistema = ['cliente', 'moderador', 'administrador'].includes(r.nombre);
                        return (
                          <tr key={r.id}>
                            <td>{r.id}</td>
                            <td><span className={`rol-badge rol-${r.nombre}`}>{r.nombre}</span></td>
                            <td>{r.descripcion || '—'}</td>
                            <td>
                              <span className={`estado-badge ${esSistema ? 'estado-activo' : 'estado-inactivo'}`}>
                                {esSistema ? 'Sistema' : 'Personalizado'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminUsuarios;
