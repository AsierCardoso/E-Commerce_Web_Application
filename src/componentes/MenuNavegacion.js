// src/componentes/MenuNavegacion.js
import React, { useState, useEffect } from 'react';

const MenuNavegacion = ({ onOpenCart, seccionActual, setSeccionActual, user }) => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleNavClick = (seccion) => {
    setSeccionActual(seccion);
  };

  return (
    <nav className="bg-light py-2 rounded" style={{ position: 'relative' }}>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <button 
            className={`nav-link btn btn-link rounded ${seccionActual === 'productos' ? 'active' : ''}`}
            onClick={() => handleNavClick('productos')}
          >
            Productos
          </button>
        </li>
        
        {user && (
          <li className="nav-item">
            <button 
              className={`nav-link btn btn-link rounded ${seccionActual === 'mi-cuenta' ? 'active' : ''}`}
              onClick={() => handleNavClick('mi-cuenta')}
            >
              Mi Cuenta
            </button>
          </li>
        )}
        
        {user?.rol === 'admin' && (
          <>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link rounded ${seccionActual === 'añadir-producto' ? 'active' : ''}`}
                onClick={() => handleNavClick('añadir-producto')}
              >
                Añadir Producto
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link rounded ${seccionActual === 'editar-productos' ? 'active' : ''}`}
                onClick={() => handleNavClick('editar-productos')}
              >
                Editar/Borrar Productos
              </button>
            </li>
          </>
        )}
        
        <li className="nav-item">
          <button 
            className="nav-link btn btn-link rounded" 
            onClick={onOpenCart}
          >
            Carrito
          </button>
        </li>
      </ul>
      
      {!online && (
        <div 
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'red',
            color: 'white',
            border: '1px solid white',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '0.8rem'
          }}
        >
          Estás offline
        </div>
      )}
    </nav>
  );
};

export default MenuNavegacion;