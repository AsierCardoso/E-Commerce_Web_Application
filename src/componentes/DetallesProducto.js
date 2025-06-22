// src/componentes/DetallesProducto.js
import React from 'react';

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

const DetallesProducto = ({ product, onClose }) => {
  if (!product) return null;
  
  return (
    <>
      <div 
         id="product-overlay"
         style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 10000
         }}
         onClick={onClose}
      />
      <div 
         id="product-details"
         style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "800px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            overflow: "hidden",
            zIndex: 10001,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)"
         }}
      >
        <div style={{ backgroundColor: "#fff", padding: "10px", position: "relative", borderBottom: "1px solid #ddd" }}>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ margin: 0 }}>{product.nombre} - {product.precio}€</h3>
          </div>
          <button 
             style={{ position: "absolute", top: "10px", right: "10px" }} 
             className="btn btn-secondary"
             onClick={onClose}
          >
            Cerrar
          </button>
        </div>
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          <div style={{ flex: 1, backgroundColor: "#f8f8f8", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
            <img src={product.imagen} alt={product.nombre} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
          </div>
          <div style={{ flex: 1, padding: "20px", overflowY: "auto", maxHeight: "70vh" }}>
            {product.campoExtra?.valor && (
              <p><strong>{getCampoExtraLabel(product.tipo)}:</strong> {product.campoExtra.valor}</p>
            )}
            <p>{product.descripcion}</p>
            <p>Valoración: {product.valoracion}★</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetallesProducto;
