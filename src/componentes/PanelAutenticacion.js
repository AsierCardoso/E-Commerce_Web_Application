import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const PanelAutenticacion = ({ offline }) => {
  const { user, login, logout, visitas, checkAuthStatus } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (offline) return;

    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (result.success) {
      setEmail('');
      setPassword('');
      setTimeout(() => {
        checkAuthStatus();
      }, 200);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  if (user) {
    // Panel de usuario autenticado
    return (
      <aside className="col-md-4 p-3 border-end rounded bg-white">
        <h3 className="mb-3">Bienvenide, {user.nombre}</h3>
        
        <div className="card mb-3">
          <div className="card-body">
            <div className="row">
              {user.rol === 'admin' && (
                <div className="col-6">
                  <strong>Rol:</strong>
                  <br />
                  <span className="badge bg-danger">
                    Administrador
                  </span>
                </div>
              )}
              <div className="col-6">
                <strong>Visitas:</strong>
                <br />
                <span className="badge bg-success">{visitas}</span>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="btn btn-outline-danger w-100"
          disabled={offline}
        >
          Cerrar Sesión
        </button>
      </aside>
    );
  }

  // Panel de autenticación
  return (
    <aside className="col-md-4 p-3 border-end rounded bg-white">
      <h3 className="mb-3">Iniciar Sesión</h3>
      
      <form onSubmit={handleLogin} className="rounded p-3 border">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control rounded" 
            id="email" 
            placeholder="tu@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={offline || loading}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input 
            type="password" 
            className="form-control rounded" 
            id="password" 
            placeholder="Contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={offline || loading}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary rounded w-100" 
          disabled={offline || loading}
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>

      {error && (
        <div className="mt-3 alert alert-danger">
          {error}
        </div>
      )}

      {offline && (
        <div className="mt-3 alert alert-warning">
          <strong>Modo offline:</strong> No puedes iniciar sesión sin conexión.
        </div>
      )}

      <div className="mt-3 p-3 bg-light rounded">
        <small className="text-muted">
          <strong>Usuarios de prueba:</strong><br />
          • admin@tienda.com (Administrador)<br />
          • usuario@tienda.com (Usuario)
        </small>
      </div>
    </aside>
  );
};

export default PanelAutenticacion; 