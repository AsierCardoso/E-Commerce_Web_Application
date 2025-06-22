// src/hooks/useCartStorage.js
import { useEffect } from 'react';
import { guardarEnCarrito, borrarDelCarrito, cargarCarrito } from '../tienda/tienda';

const useCartStorage = (cartItems, setCartItems) => {
  // Al montar el componente, carga el carrito desde localStorage
  useEffect(() => {
    const storedCart = cargarCarrito();
    if (storedCart && storedCart.length > 0) {
      setCartItems(storedCart);
    }
  }, [setCartItems]);

  // Cada vez que el carrito cambie, actualiza localStorage:
  useEffect(() => {
    // Guarda o actualiza cada producto en el carrito
    cartItems.forEach(item => {
      guardarEnCarrito(item);
    });

    // Elimina del localStorage los productos que ya no estén en el carrito
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('producto_')) {
        const exists = cartItems.some(item => `producto_${item.id}` === key);
        if (!exists) {
          keysToRemove.push(key);
        }
      }
    }
    keysToRemove.forEach(key => {
      const id = key.substring('producto_'.length);
      borrarDelCarrito(id);
    });
  }, [cartItems]);
};

export default useCartStorage;
