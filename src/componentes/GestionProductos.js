import React, { useState, useEffect } from 'react';
import CustomDragDrop from './CustomDragDrop'; // Importar para subida de imágenes

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

// Nueva función para obtener el nombre de clave del campo extra
function getCampoExtraKey(tipo) {
  switch (tipo) {
    case 'videojuego': return 'compania';
    case 'libro': return 'autor';
    case 'ropa': return 'talla';
    case 'electronica': return 'marca';
    case 'juguete': return 'edadRecomendada';
    default: return 'extra';
  }
}

const GestionProductos = ({ offline, onUpdateProduct, onDeleteProduct, productos }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [localProductos, setLocalProductos] = useState([]);
  const [newImage, setNewImage] = useState(null); // Estado para la nueva imagen

  useEffect(() => {
    setLocalProductos(productos);
  }, [productos]);

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === localProductos.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(localProductos.map(p => p._id));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedProducts.length === 0) {
      setMensaje({ text: 'Selecciona al menos un producto para eliminar', type: 'error' });
      return;
    }

    if (!window.confirm(`¿Estás seguro de que quieres eliminar ${selectedProducts.length} producto(s)?`)) {
      return;
    }

    // Eliminar productos uno por uno
    for (const productId of selectedProducts) {
      const result = await onDeleteProduct(productId);
      if (!result.success) {
        setMensaje({ text: `Error al eliminar producto ${productId}`, type: 'error' });
        return;
      }
    }

    setSelectedProducts([]);
    setMensaje({ text: `${selectedProducts.length} producto(s) eliminado(s) correctamente`, type: 'success' });
  };

  const handleEdit = (producto) => {
    setEditingProduct(editingProduct === producto._id ? null : producto._id);
    setNewImage(null); // Limpiar imagen al abrir/cerrar editor
  };

  const uploadImage = async (file, tipo) => {
    const formData = new FormData();
    formData.append('imagen', file);
    formData.append('tipo', tipo);
    try {
      const response = await fetch('http://localhost:4000/api/productos/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.success) return data.imagePath;
      throw new Error('Error al subir la imagen');
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      throw error;
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    let productoToUpdate = localProductos.find(p => p._id === editingProduct);
    if (!productoToUpdate) return;

    if (newImage) {
      try {
        const imageData = await uploadImage(newImage, productoToUpdate.tipo);
        productoToUpdate = { ...productoToUpdate, imagen: imageData };
      } catch (error) {
        setMensaje({ text: 'Error al subir la nueva imagen.', type: 'error' });
        return;
      }
    }

    const result = await onUpdateProduct(productoToUpdate);
    if (result.success) {
      setLocalProductos(prev => prev.map(p => p._id === result.producto._id ? result.producto : p));
      setEditingProduct(null);
      setNewImage(null);
      setMensaje({ text: 'Producto actualizado correctamente.', type: 'success' });
    } else {
      setMensaje({ text: result.error || 'Error al actualizar.', type: 'error' });
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setNewImage(null);
  };

  const updateLocalProduct = (productId, field, value) => {
    setLocalProductos(prev => prev.map(p =>
      p._id === productId ? { ...p, [field]: value } : p
    ));
  };
  
  const handleTypeChange = (productId, newTipo) => {
    setLocalProductos(prev => prev.map(p =>
      p._id === productId
        ? {
          ...p,
          tipo: newTipo,
          campoExtra: {
            nombre: getCampoExtraKey(newTipo),
            valor: '' // Limpiar valor del campo extra al cambiar tipo
          }
        }
        : p
    ));
  };

  const updateLocalProductExtra = (productId, value) => {
    setLocalProductos(prev => prev.map(p =>
      p._id === productId
        ? { ...p, campoExtra: { ...p.campoExtra, valor: value } }
        : p
    ));
  };
  
  const handleFileSelect = (file) => {
    if (file) setNewImage(file);
  };

  return (
    <div className="col-md-8 p-3">
      <h2 className="mb-4 bg-white p-3 rounded shadow-sm">Gestión de Productos</h2>
      
      {mensaje && (
        <div className={`alert ${mensaje.type === 'error' ? 'alert-danger' : 'alert-success'} mb-3`}>
          {mensaje.text}
        </div>
      )}

      {offline && (
        <div className="alert alert-warning mb-3">
          <strong>Modo offline:</strong> No puedes gestionar productos sin conexión.
        </div>
      )}

      {/* Botón para borrar seleccionados */}
      <div className="mb-3">
        <button 
          className={`btn ${selectedProducts.length === 0 ? 'btn-secondary border' : 'btn-danger'}`}
          onClick={handleDeleteSelected}
          disabled={offline || selectedProducts.length === 0}
        >
          Borrar todos los seleccionados ({selectedProducts.length})
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  checked={selectedProducts.length === localProductos.length && localProductos.length > 0}
                  onChange={handleSelectAll}
                  disabled={offline}
                />
              </th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Precio</th>
              <th>Valoración</th>
              <th>Campo Extra</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {localProductos.map(producto => (
              <React.Fragment key={producto._id}>
                <tr>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedProducts.includes(producto._id)}
                      onChange={() => handleSelectProduct(producto._id)}
                      disabled={offline}
                    />
                  </td>
                  <td>
                    <img 
                      src={producto.imagen} 
                      alt={producto.nombre} 
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                  </td>
                  <td>{producto.nombre}</td>
                  <td>
                    <span className={`badge ${
                      producto.tipo === 'videojuego' ? 'bg-primary' :
                      producto.tipo === 'libro' ? 'bg-success' :
                      producto.tipo === 'ropa' ? 'bg-warning' :
                      producto.tipo === 'electronica' ? 'bg-info' :
                      'bg-secondary'
                    }`}>
                      {producto.tipo}
                    </span>
                  </td>
                  <td>{producto.precio}€</td>
                  <td>{'★'.repeat(producto.valoracion)}</td>
                  <td>{getCampoExtraLabel(producto.tipo)}: {producto.campoExtra?.valor || ''}</td>
                  <td>
                    <button 
                      className="btn btn-link p-0"
                      onClick={() => handleEdit(producto)}
                      disabled={offline}
                    >
                      {editingProduct === producto._id ? 'Cerrar' : 'Editar'}
                    </button>
                  </td>
                </tr>
                {/* Formulario de edición expandible */}
                {editingProduct === producto._id && (
                  <tr>
                    <td colSpan="8">
                      <div className="p-3 bg-light border rounded">
                        <form onSubmit={handleSaveEdit}>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">Tipo</label>
                                <select
                                  className="form-select"
                                  value={producto.tipo}
                                  onChange={(e) => handleTypeChange(producto._id, e.target.value)}
                                >
                                  <option value="videojuego">Videojuego</option>
                                  <option value="libro">Libro</option>
                                  <option value="ropa">Ropa</option>
                                  <option value="electronica">Electrónica</option>
                                  <option value="juguete">Juguete</option>
                                </select>
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input 
                                  type="text" 
                                  className="form-control"
                                  value={producto.nombre}
                                  onChange={(e) => updateLocalProduct(producto._id, 'nombre', e.target.value)}
                                  required
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Precio</label>
                                <input 
                                  type="number" 
                                  className="form-control"
                                  value={producto.precio}
                                  onChange={(e) => updateLocalProduct(producto._id, 'precio', parseFloat(e.target.value))}
                                  min="0"
                                  step="0.01"
                                  required
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Valoración</label>
                                <select 
                                  className="form-select"
                                  value={producto.valoracion}
                                  onChange={(e) => updateLocalProduct(producto._id, 'valoracion', parseInt(e.target.value))}
                                >
                                  <option value={1}>1★</option>
                                  <option value={2}>2★</option>
                                  <option value={3}>3★</option>
                                  <option value={4}>4★</option>
                                  <option value={5}>5★</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">Descripción</label>
                                <textarea 
                                  className="form-control"
                                  rows="3"
                                  value={producto.descripcion}
                                  onChange={(e) => updateLocalProduct(producto._id, 'descripcion', e.target.value)}
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">{getCampoExtraLabel(producto.tipo)}</label>
                                <input 
                                  type="text" 
                                  className="form-control"
                                  value={producto.campoExtra?.valor || ''}
                                  onChange={(e) => updateLocalProductExtra(producto._id, e.target.value)}
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Cambiar Imagen</label>
                                <CustomDragDrop
                                  onFileSelect={handleFileSelect}
                                  texto="O suelta la nueva imagen aquí"
                                />
                                {newImage && <p className="mt-2 text-success">Nueva imagen: {newImage.name}</p>}
                              </div>
                            </div>
                          </div>
                          <div className="text-end">
                            <button type="button" className="btn btn-secondary me-2" onClick={handleCancelEdit}>
                              Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary">
                              Guardar cambios
                            </button>
                          </div>
                        </form>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionProductos; 