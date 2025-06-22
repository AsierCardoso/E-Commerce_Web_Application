// src/componentes/EscaparateProductos.js
import React, { useState } from 'react';
import CardProducto from './CardProducto';
import DetallesProducto from './DetallesProducto';

const EscaparateProductos = ({ productos, onAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div id="productos" className="row g-3 mt-3 bg-white p-3 rounded" style={{ position: 'relative' }}>
      {productos.length === 0 ? (
        <p className="text-center">No hay productos.</p>
      ) : (
        productos.map(product => (
          <CardProducto
            key={product.id}
            product={product}
            onProductClick={handleProductClick}
            onAddToCart={onAddToCart}
          />
        ))
      )}
      { selectedProduct && (
        <DetallesProducto product={selectedProduct} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default EscaparateProductos;
