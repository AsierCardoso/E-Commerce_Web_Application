// src/componentes/CardProducto.js
import React, { useState } from 'react';
import cartIcon from '../imagenes/cart.png';

// Función auxiliar para obtener el nombre del campo extra según el tipo
function getCampoExtraLabel(tipo) {
  switch (tipo) {
    case 'videojuego': return 'Compañía';
    case 'libro': return 'Autor';
    case 'ropa': return 'Talla';
    case 'electronica': return 'Marca';
    case 'juguete': return 'Edad recomendada';
    default: return 'Campo Extra';
  }
}

const CardProducto = ({ product, onProductClick, onAddToCart }) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation(); // Prevenir que se dispare el onClick de la imagen
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="col-md-4">
      <div className="card rounded h-100" style={{ height: "400px", position: "relative" }}>
        <img 
          src={product.imagen}
          className="card-img-top rounded"
          alt={product.nombre}
          style={{ cursor: "pointer" }}
          onClick={() => onProductClick(product)}
        />
        { justAdded ? (
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "#28a745",
              color: "#fff",
              padding: "5px 10px",
              borderRadius: "5px"
            }}
          >
            ¡Añadido!
          </div>
        ) : (
          <button 
            className="btn btn-light position-absolute rounded-circle p-0" 
            style={{ top: "10px", right: "10px", width: "40px", height: "40px" }}
            onClick={handleAdd}
          >
            <img src={cartIcon} alt="Carrito" style={{ width: "24px", height: "24px", objectFit: "contain" }}/>
          </button>
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.nombre}</h5>
          <p className="card-text description">{product.descripcion}</p>
          <p className="card-text extra">
            {product.campoExtra?.valor && (
              `${getCampoExtraLabel(product.tipo)}: ${product.campoExtra.valor}`
            )}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <p className="card-text price fw-bold mb-0" style={{ fontSize: "1.25rem" }}>{product.precio}€</p>
            <p className="card-text valoracion mb-0" style={{ fontSize: "1rem" }}>{product.valoracion}★</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProducto;
