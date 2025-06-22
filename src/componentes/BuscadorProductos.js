// src/componentes/BuscadorProductos.js
// Componente funcional que renderiza un input de búsqueda y un botón para mostrar los ajustes.
// Recibe tres props:
// - query: valor actual del campo de búsqueda.
// - setQuery: función para actualizar el valor de búsqueda en el componente padre.
// - toggleAjustes: función para alternar la visibilidad de los ajustes de filtrado.
import React from 'react';

const BuscadorProductos = ({ query, setQuery, toggleAjustes }) => {
  return (
    <div className="d-flex align-items-center">
      <input 
         type="search"
         className="form-control rounded me-2"
         placeholder="Buscar producto"
         value={query}
         onChange={e => setQuery(e.target.value)} // Se actualiza la búsqueda al escribir
      />
      <button className="btn btn-light border" onClick={toggleAjustes}>
        Ajustes
      </button>
    </div>
  );
};

export default BuscadorProductos;
