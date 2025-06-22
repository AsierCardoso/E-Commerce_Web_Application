// src/componentes/Carrito.js
import React from 'react';

const Carrito = ({ cartItems, onUpdateQuantity, onCloseCart }) => {
  const total = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.precio) * item.cantidad,
    0
  );

  return (
    <div className="offcanvas offcanvas-end rounded" tabIndex="-1" id="offcanvasCart">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Carrito de la compra</h5>
        <button 
          type="button" 
          className="btn-close" 
          onClick={onCloseCart} 
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body" style={{ maxHeight: "60vh", overflowY: "auto" }}>
        {cartItems.length === 0 ? (
          <p className="text-center">No hay productos en el carrito.</p>
        ) : (
          <>
            {cartItems.map(item => (
              <React.Fragment key={item.id}>
                <div className="cart-item d-flex align-items-center mb-3 rounded border p-2">
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="rounded me-2"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-0">{item.nombre}</h6>
                    <div className="d-flex align-items-center">
                      <small>{item.precio}€ x </small>
                      <input
                        type="number"
                        className="form-control form-control-sm mx-2"
                        style={{ width: "50px" }}
                        value={item.cantidad}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") return; // Si está vacío, no se actualiza
                          onUpdateQuantity(item.id, parseInt(value));
                        }}
                        min="0"
                        max="20"
                      />
                      <small className="ms-2">
                        Subtotal: {(parseFloat(item.precio) * item.cantidad).toFixed(2)}€
                      </small>
                    </div>
                  </div>
                </div>
                {item.error && (
                  <div className="alert alert-danger mt-1" style={{ fontSize: "0.8rem" }}>
                    {item.error}
                  </div>
                )}
              </React.Fragment>
            ))}
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <strong>Total:</strong> <strong>{total.toFixed(2)}€</strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Carrito;
