// src/componentes/CustomDragDrop.js
import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ["JPEG", "PNG", "JPG"];

const CustomDragDrop = ({ onFileSelect, disabled }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleChange = (file) => {
    if (disabled) return;
    
    // Limpiar errores previos
    setError(null);
    
    // Si ya se seleccionó un archivo, no se permite añadir otro
    if (fileName) {
      setError("Solo se puede subir una imagen");
      setTimeout(() => setError(null), 2000);
      return;
    }
    
    // Obtener el archivo (si viene en array, tomar el primero)
    let selectedFile = Array.isArray(file) ? file[0] : file;
    
    // Validar el tipo usando el MIME type
    const acceptedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!acceptedTypes.includes(selectedFile.type)) {
      setError("El archivo debe ser JPG, JPEG o PNG");
      setTimeout(() => setError(null), 2000);
      return;
    }
    
    // Validar tamaño (5MB máximo)
    const maxSize = 5 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setError("El archivo no puede superar 5MB");
      setTimeout(() => setError(null), 2000);
      return;
    }
    
    setFileName(selectedFile.name);
    onFileSelect(selectedFile);
    setDragActive(false);
  };

  const handleDragEnter = () => {
    if (!disabled) setDragActive(true);
  };

  const handleDragLeave = () => {
    if (!disabled) setDragActive(false);
  };

  return (
    <div>
      <FileUploader
        handleChange={handleChange}
        name="imagenProducto"
        types={fileTypes}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        disabled={disabled}
        children={
          <div
            style={{
              border: '2px dashed #ccc',
              padding: '20px',
              textAlign: 'center',
              cursor: disabled ? 'not-allowed' : 'pointer',
              backgroundColor: disabled ? '#eee' : (dragActive ? '#e3f2fd' : 'transparent'),
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}
          >
            {dragActive 
              ? "Suelta la imagen aquí" 
              : fileName 
                ? `Imagen seleccionada: ${fileName}`
                : "Arrastra una imagen aquí o haz clic para seleccionar"
            }
          </div>
        }
      />
      {error && (
        <div style={{ color: 'red', marginTop: '10px', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default CustomDragDrop;
