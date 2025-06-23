// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import './css/styles.css';
import Cabecera from './componentes/Cabecera';
import MenuNavegacion from './componentes/MenuNavegacion';
import BuscadorProductos from './componentes/BuscadorProductos';
import EscaparateProductos from './componentes/EscaparateProductos';
import Paginacion from './componentes/Paginacion';
import FormularioNuevosProductos from './componentes/FormularioNuevosProductos';
import GestionProductos from './componentes/GestionProductos';
import Pie from './componentes/Pie';
import Carrito from './componentes/Carrito';
import FiltrosAjustes from './componentes/FiltrosAjustes';
import PanelAutenticacion from './componentes/PanelAutenticacion';
import MiCuenta from './componentes/MiCuenta';
import { AuthProvider, useAuth } from './contexts/AuthContext';

/*
  Componente: AppContent
  Descripción: Contenido principal de la aplicación con autenticación
*/
function AppContent() {
  const { user } = useAuth();
  
   // Estado online/offline: Define si la aplicación está en modo offline según la conexión del navegador.
  const [offline, setOffline] = useState(!navigator.onLine);
  
  // Estados globales
  const [productos, setProductos] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [mostrarAjustes, setMostrarAjustes] = useState(false);
  const [seccionActual, setSeccionActual] = useState('productos'); // 'productos', 'mi-cuenta', 'añadir-producto'

  // Calcular el precio máximo de los productos, de 1000 si no hay productos.
  const computedMaxPrice = productos.length > 0 ? Math.max(...productos.map(p => p.precio)) : 1000;

  // Estados para los filtros duales
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(computedMaxPrice);
  const [valoracionMin, setValoracionMin] = useState(1);
  const [valoracionMax, setValoracionMax] = useState(5);

  // Ref para el precio máximo
  const precioMaxRef = useRef(computedMaxPrice);
  
  /*
    useEffect: Configura los event listeners para detectar cambios en la conexión.
  */
  useEffect(() => {
    const handleOnline = () => setOffline(false);
    const handleOffline = () => setOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  /*
    useEffect: Cargar productos desde el backend
  */
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/productos');
        if (response.ok) {
          const data = await response.json();
          setProductos(data);
        }
      } catch (error) {
        console.error('Error cargando productos:', error);
      }
    };

    if (!offline) {
      cargarProductos();
    }
  }, [offline]);

  /*
    useEffect: Sincroniza el estado precioMax con el valor computado.
  */
  useEffect(() => {
    if (precioMax === precioMaxRef.current) {
      setPrecioMax(computedMaxPrice);
    }
    precioMaxRef.current = computedMaxPrice;
  }, [computedMaxPrice, precioMax]);

    /*
    useEffect: Filtrado de productos según query, rango de precio y valoración.
  */
  useEffect(() => {
    const filtrados = productos.filter(p =>
      p.nombre.toLowerCase().includes(query.toLowerCase()) &&
      p.precio >= precioMin && p.precio <= precioMax &&
      p.valoracion >= valoracionMin && p.valoracion <= valoracionMax
    );
    setProductosFiltrados(filtrados);
    setCurrentPage(1);
  }, [query, precioMin, precioMax, valoracionMin, valoracionMax, productos]);

  const productsPerPage = 9;
  const totalPages = Math.ceil(productosFiltrados.length / productsPerPage);
  const currentProducts = productosFiltrados.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.nombre === product.nombre);
      if (existingItem) {
        if (existingItem.cantidad < 20) {
          return prev.map((item) =>
            item.nombre === product.nombre ? { ...item, cantidad: item.cantidad + 1 } : item
          );
        }
        return prev;
      }
      return [
        ...prev,
        {
          id: product._id || product.id,
          nombre: product.nombre,
          precio: product.precio,
          imagen: product.imagen,
          cantidad: 1,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    setCartItems(prev => {
      const item = prev.find(item => item.id === id);
      if (!item) return prev;
      if (newQuantity <= 0) {
        return prev.filter(item => item.id !== id);
      }
      if (newQuantity >= 20) {
        const updatedCart = prev.map(item =>
          item.id === id ? { ...item, cantidad: 20, error: "La cantidad máxima es 20" } : item
        );
        setTimeout(() => {
          setCartItems(prev2 =>
            prev2.map(item => item.id === id ? { ...item, error: null } : item)
          );
        }, 2000);
        return updatedCart;
      }
      return prev.map(item =>
        item.id === id ? { ...item, cantidad: newQuantity, error: null } : item
      );
    });
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await fetch('http://localhost:4000/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });

      if (response.ok) {
        const productoGuardado = await response.json();
        setProductos(prev => [...prev, productoGuardado]);
        setSeccionActual('productos'); // Volver a la vista de productos
      }
    } catch (error) {
      console.error('Error añadiendo producto:', error);
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const response = await fetch(`http://localhost:4000/api/productos/${updatedProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
      });

      if (response.ok) {
        const productoActualizado = await response.json();
        setProductos(prev => prev.map(p => p._id === productoActualizado._id ? productoActualizado : p));
        return { success: true, producto: productoActualizado };
      } else {
        return { success: false, error: 'Error al actualizar el producto' };
      }
    } catch (error) {
      console.error('Error actualizando producto:', error);
      return { success: false, error: 'Error al actualizar el producto' };
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/productos/${productId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setProductos(prev => prev.filter(p => p._id !== productId));
        return { success: true };
      } else {
        return { success: false, error: 'Error al eliminar el producto' };
      }
    } catch (error) {
      console.error('Error eliminando producto:', error);
      return { success: false, error: 'Error al eliminar el producto' };
    }
  };

  const toggleAjustes = () => {
    setMostrarAjustes(!mostrarAjustes);
  };

  const openCart = () => {
    const offcanvas = document.getElementById('offcanvasCart');
    if (offcanvas) {
      offcanvas.classList.add('show');
    }
  };

  const closeCart = () => {
    const offcanvas = document.getElementById('offcanvasCart');
    if (offcanvas) {
      offcanvas.classList.remove('show');
    }
  };

  const handlePrecioMinChange = (e) => {
    const value = parseFloat(e.target.value);
    setPrecioMin(value);
  };

  const handlePrecioMaxChange = (e) => {
    const value = parseFloat(e.target.value);
    setPrecioMax(value);
  };

  const handleValoracionMinChange = (e) => {
    const value = parseInt(e.target.value);
    setValoracionMin(value);
  };

  const handleValoracionMaxChange = (e) => {
    const value = parseInt(e.target.value);
    setValoracionMax(value);
  };

  // Renderizar contenido según la sección actual
  const renderContenidoPrincipal = () => {
    switch (seccionActual) {
      case 'mi-cuenta':
        return <MiCuenta offline={offline} />;
      case 'añadir-producto':
        return user?.rol === 'admin' ? (
          <FormularioNuevosProductos onAddProduct={handleAddProduct} offline={offline} />
        ) : (
          <div className="col-md-8 p-3">
            <div className="alert alert-warning">
              Solo los administradores pueden añadir productos.
            </div>
          </div>
        );
      case 'editar-productos':
        return user?.rol === 'admin' ? (
          <GestionProductos 
            offline={offline} 
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            productos={productos}
          />
        ) : (
          <div className="col-md-8 p-3">
            <div className="alert alert-warning">
              Solo los administradores pueden gestionar productos.
            </div>
          </div>
        );
      default:
        return (
          <>
            <div className="col-md-8 p-3">
              <BuscadorProductos 
                query={query} 
                setQuery={setQuery} 
                toggleAjustes={toggleAjustes}
                offline={offline}
              />
            {mostrarAjustes && (
              <FiltrosAjustes 
                precioMin={precioMin}
                precioMax={precioMax}
                  valoracionMin={valoracionMin}
                  valoracionMax={valoracionMax}
                onPrecioMinChange={handlePrecioMinChange}
                onPrecioMaxChange={handlePrecioMaxChange}
                onValoracionMinChange={handleValoracionMinChange}
                onValoracionMaxChange={handleValoracionMaxChange}
                  offline={offline}
              />
            )}
              <EscaparateProductos 
                productos={currentProducts} 
                onAddToCart={handleAddToCart} 
                offline={offline}
              />
              <Paginacion 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange}
                currentCount={currentProducts.length}
                totalCount={productosFiltrados.length}
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="App">
      <Cabecera />
      <MenuNavegacion 
        onOpenCart={openCart}
        seccionActual={seccionActual}
        setSeccionActual={setSeccionActual}
        user={user}
      />
      
      <main className="container-fluid">
        <div className="row">
          <PanelAutenticacion offline={offline} />
          {renderContenidoPrincipal()}
        </div>
      </main>

      <Carrito 
         cartItems={cartItems} 
         onUpdateQuantity={handleUpdateQuantity} 
         onCloseCart={closeCart}
      />
      
      <Pie />
    </div>
  );
}

/*
  Componente: App
  Descripción: Wrapper principal que proporciona el contexto de autenticación
*/
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
