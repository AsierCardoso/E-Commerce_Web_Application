import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const PanelAutenticacion = ({ offline }) => {
  const { currentUser, login, logout, visitas } = useContext(AuthContext);
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
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  if (currentUser) {
    return (
      <aside className="col-md-4 p-3 border-end rounded bg-white">
        <h3 className="mb-3">Bienvenide, {currentUser.nombre}</h3>
        
        <div className="card mb-3">
          <div className="card-body">
            <div className="row">
              {currentUser.rol === 'admin' && (
                <div className="col-6">
                  <strong>Rol:</strong>
                  <br />
                  <span className="badge bg-danger">
                    Administrador
                  </span>
                </div>
              )}
              {visitas !== undefined && (
                <div className="col-6">
                  <strong>Visitas:</strong>
                  <br />
                  <span className="badge bg-success">{visitas}</span>
                </div>
              )}
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

  return (
    <div className="authentication-panel p-3 bg-light rounded shadow-sm">
      <h5 className="mb-3 text-center">Iniciar Sesión</h5>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email-login" className="form-label">Email</label>
          <input
            type="email"
            id="email-login"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={offline || loading}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password-login" className="form-label">Contraseña</label>
          <input
            type="password"
            id="password-login"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={offline || loading}
          />
        </div>
        {error && <p className="text-danger small">{error}</p>}
        <button type="submit" className="btn btn-primary w-100" disabled={offline || loading}>
          {loading ? 'Iniciando...' : 'Entrar'}
        </button>
      </form>
      <div className="text-center mt-3">
        <Link to="/registro">¿No tienes cuenta? Regístrate</Link>
      </div>
    </div>
  );
};

export default PanelAutenticacion; 