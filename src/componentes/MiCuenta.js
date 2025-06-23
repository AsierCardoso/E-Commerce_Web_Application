import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const MiCuenta = ({ offline }) => {
  const { currentUser, updateProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    fechaNacimiento: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        nombre: currentUser.nombre || '',
        telefono: currentUser.telefono || '',
        direccion: currentUser.direccion || '',
        fechaNacimiento: currentUser.fechaNacimiento ? currentUser.fechaNacimiento.split('T')[0] : ''
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (offline) return;

    setLoading(true);
    setMessage({ text: '', type: '' });

    const result = await updateProfile(formData);
    
    if (result.success) {
      setMessage({ text: 'Perfil actualizado correctamente', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } else {
      setMessage({ text: result.error || 'Error al actualizar', type: 'error' });
      setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    }
    
    setLoading(false);
  };

  if (!currentUser) {
    return (
      <div className="col-md-8 p-3">
        <div className="alert alert-warning">
          Debes iniciar sesión para acceder a tu cuenta.
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-8 p-3">
      <h2 className="mb-4 bg-white p-3 rounded shadow-sm">Mi Cuenta</h2>
      
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="nombre" className="form-label">Nombre *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="nombre" 
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  disabled={offline || loading}
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">Email (no se puede cambiar)</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  value={currentUser.email}
                  disabled
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="telefono" className="form-label">Teléfono</label>
                <input 
                  type="tel" 
                  className="form-control" 
                  id="telefono" 
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  disabled={offline || loading}
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
                <input 
                  type="date" 
                  className="form-control" 
                  id="fechaNacimiento" 
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  disabled={offline || loading}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="direccion" className="form-label">Dirección</label>
              <textarea 
                className="form-control" 
                id="direccion" 
                name="direccion"
                rows="3"
                value={formData.direccion}
                onChange={handleChange}
                disabled={offline || loading}
              ></textarea>
            </div>

            {currentUser.rol === 'admin' && (
              <div className="mb-3">
                <label htmlFor="rol" className="form-label">Rol</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="rol" 
                  value={currentUser.rol} 
                  disabled 
                />
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={offline || loading}
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </form>

          {message.text && (
            <div className={`mt-3 alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
              {message.text}
            </div>
          )}

          {offline && (
            <div className="mt-3 alert alert-warning">
              <strong>Modo offline:</strong> No puedes actualizar tu perfil sin conexión.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiCuenta; 