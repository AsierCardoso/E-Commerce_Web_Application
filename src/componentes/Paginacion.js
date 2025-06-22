// src/componentes/Paginacion.js
import React from 'react';

const Paginacion = ({ currentPage, totalPages, onPageChange, currentCount, totalCount }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <div className="pagination-container">
      <ul className="pagination justify-content-center w-100">
        { currentPage > 1 && (
          <li className="page-item">
            <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
              Anterior
            </button>
          </li>
        )}
        { pages.map(page => (
          <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(page)}>{page}</button>
          </li>
        ))}
        { currentPage < totalPages && (
          <li className="page-item">
            <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
              Siguiente
            </button>
          </li>
        )}
      </ul>
      <div className="product-counter">
        Mostrando {currentCount} de {totalCount} productos
      </div>
    </div>
  );
};

export default Paginacion;
