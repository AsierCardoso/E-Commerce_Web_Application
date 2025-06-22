// src/componentes/FormularioNuevosProductos.js
import React, { useState, useRef } from 'react';
import CustomDragDrop from './CustomDragDrop';
// Importa las clases para crear productos con id
import { Videojuego, Libro, Ropa, Electronica, Juguete } from '../tienda/clases.js';

const FormularioNuevosProductos = ({ onAddProduct, offline }) => {
  const [tipo, setTipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [extra, setExtra] = useState("");
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState(null); // { text: string, type: 'success'|'error' }
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Ref para el input file
  const fileInputRef = useRef(null);

  // Función para validar archivo
  const validateFile = (file) => {
    const acceptedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!acceptedTypes.includes(file.type)) {
      setMensaje({ text: "El archivo debe ser JPG, JPEG o PNG.", type: "error" });
      setTimeout(() => setMensaje(null), 2000);
      return false;
    }

    if (file.size > maxSize) {
      setMensaje({ text: "El archivo no puede superar 5MB.", type: "error" });
      setTimeout(() => setMensaje(null), 2000);
      return false;
    }

    return true;
  };

  // Función para sincronizar el input file con el drag & drop
  const syncFileInput = (file) => {
    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('imagen', file);
    formData.append('tipo', tipo);

    try {
      const response = await fetch('http://localhost:4000/api/productos/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        return data.imagePath;
      } else {
        throw new Error('Error al subir la imagen');
      }
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (offline) return; // No permite enviar si está offline
    
    setIsSubmitting(true);
    setMensaje(null);

    try {
      // Validar campos obligatorios
      if (!tipo || !nombre || !precio || !extra) {
        setMensaje({ text: "Completa todos los campos obligatorios.", type: "error" });
        return;
      }

      // Subir imagen si existe
      let imagenUrl = '/imagenes/sin-imagen.png';
      if (imagen) {
        try {
          imagenUrl = await uploadImage(imagen);
        } catch (error) {
          setMensaje({ text: "Error al subir la imagen. Inténtalo de nuevo.", type: "error" });
          return;
        }
      }

      // Crear el producto con la imagen subida
      const productoData = {
        tipo,
        nombre,
        precio: parseFloat(precio),
        descripcion,
        imagen: imagenUrl,
        valoracion: 3,
        campoExtra: {
          nombre: tipo === 'videojuego' ? 'compania' : 
                 tipo === 'libro' ? 'autor' :
                 tipo === 'ropa' ? 'talla' :
                 tipo === 'electronica' ? 'marca' :
                 tipo === 'juguete' ? 'edadRecomendada' : '',
          valor: extra
        }
      };

      await onAddProduct(productoData);
      setMensaje({ text: "¡Producto añadido con éxito!", type: "success" });
      
      // Reiniciar formulario
      setTipo("");
      setNombre("");
      setPrecio("");
      setDescripcion("");
      setExtra("");
      setImagen(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setMensaje({ text: "Error al crear el producto. Inténtalo de nuevo.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    if (offline) return;
    
    const files = e.target.files;
    
    if (files.length > 1) {
      setMensaje({ text: "Solo se puede subir una imagen.", type: "error" });
      setTimeout(() => setMensaje(null), 2000);
      e.target.value = '';
      return;
    }

    if (files.length === 1) {
      const file = files[0];
      if (validateFile(file)) {
        setImagen(file);
      } else {
        e.target.value = '';
      }
    } else {
      setImagen(null);
    }
  };

  const handleFileSelect = (file) => {
    if (offline) return;
    
    if (Array.isArray(file) && file.length > 1) {
      setMensaje({ text: "Solo se puede subir una imagen.", type: "error" });
      setTimeout(() => setMensaje(null), 2000);
      return;
    }

    const selectedFile = Array.isArray(file) ? file[0] : file;
    
    if (validateFile(selectedFile)) {
      setImagen(selectedFile);
      syncFileInput(selectedFile);
    }
  };

  const clearImage = () => {
    setImagen(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="col-md-8 p-3">
      <h2 className="mb-4 bg-white p-3 rounded shadow-sm">Añadir Producto</h2>
      <form onSubmit={handleSubmit} className="rounded p-3 border bg-white">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="tipoProducto" className="form-label">Tipo de producto</label>
              <select 
                className="form-select rounded" 
                id="tipoProducto" 
                value={tipo}
                onChange={e => setTipo(e.target.value)}
                required
                disabled={offline || isSubmitting}
              >
                <option value="">Escoge un tipo</option>
                <option value="videojuego">Videojuego</option>
                <option value="libro">Libro</option>
                <option value="ropa">Ropa</option>
                <option value="electronica">Electrónica</option>
                <option value="juguete">Juguete</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="nombreProducto" className="form-label">Nombre del producto</label>
              <input 
                type="text" 
                className="form-control rounded" 
                id="nombreProducto" 
                placeholder="Nombre del producto" 
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                required
                disabled={offline || isSubmitting}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="precioProducto" className="form-label">Precio</label>
              <input 
                type="number" 
                className="form-control rounded" 
                id="precioProducto" 
                placeholder="Precio" 
                value={precio}
                onChange={e => setPrecio(e.target.value)}
                required 
                min="0"
                step="0.01"
                disabled={offline || isSubmitting}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="descripcionProducto" className="form-label">Descripción</label>
              <textarea 
                className="form-control rounded" 
                id="descripcionProducto" 
                rows="3" 
                placeholder="Descripción del producto"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
                disabled={offline || isSubmitting}
              ></textarea>
            </div>
            { tipo && (
              <div className="mb-3">
                <label htmlFor="campoExtra" className="form-label">
                  { tipo === 'videojuego' ? 'Compañía' : 
                    tipo === 'libro' ? 'Autor' :
                    tipo === 'ropa' ? 'Talla' :
                    tipo === 'electronica' ? 'Marca' :
                    tipo === 'juguete' ? 'Edad recomendada' : '' }
                </label>
                <input 
                  type="text" 
                  className="form-control rounded" 
                  id="campoExtra" 
                  placeholder="Información adicional"
                  value={extra}
                  onChange={e => setExtra(e.target.value)}
                  required
                  disabled={offline || isSubmitting}
                />
              </div>
            )}
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="imagenProducto" className="form-label">Imagen del producto</label>
              <input 
                ref={fileInputRef}
                type="file" 
                className="form-control rounded" 
                id="imagenProducto" 
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFileChange}
                disabled={offline || isSubmitting}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">O arrastra la imagen aquí</label>
              <CustomDragDrop onFileSelect={handleFileSelect} disabled={offline || isSubmitting} />
            </div>
            {imagen && (
              <div className="mb-3">
                <label className="form-label">Vista previa:</label>
                <div className="border rounded p-2 position-relative">
                  <img 
                    src={URL.createObjectURL(imagen)} 
                    alt="Vista previa" 
                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                  />
                  <button 
                    type="button"
                    className="btn btn-sm btn-outline-danger position-absolute"
                    style={{ top: '5px', right: '5px' }}
                    onClick={clearImage}
                    disabled={offline || isSubmitting}
                  >
                    ×
                  </button>
                </div>
                <small className="text-muted">
                  Archivo: {imagen.name} ({(imagen.size / 1024 / 1024).toFixed(2)} MB)
                </small>
              </div>
            )}
            {!imagen && (
              <div className="mb-3">
                <label className="form-label">Imagen por defecto:</label>
                <div className="border rounded p-2">
                  <img 
                    src="/imagenes/sin-imagen.png" 
                    alt="Imagen por defecto" 
                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                  />
                </div>
                <small className="text-muted">Se usará esta imagen si no subes ninguna</small>
              </div>
            )}
          </div>
        </div>
        <div className="text-center">
          <button 
            type="submit" 
            className="btn btn-success rounded px-4" 
            disabled={offline || isSubmitting}
          >
            {isSubmitting ? 'Subiendo...' : 'Subir Producto'}
          </button>
        </div>
      </form>
      {mensaje && (
        <div className={`mt-3 alert ${mensaje.type === 'error' ? 'alert-danger' : 'alert-success'}`}>
          {mensaje.text}
        </div>
      )}
    </div>
  );
};

export default FormularioNuevosProductos;
