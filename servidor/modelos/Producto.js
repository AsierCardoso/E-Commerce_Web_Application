const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true,
    enum: ['videojuego', 'libro', 'ropa', 'electronica', 'juguete']
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  descripcion: {
    type: String,
    required: true,
    trim: true
  },
  imagen: {
    type: String,
    required: true
  },
  valoracion: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 3
  },
  // Campo extra que varía según el tipo de producto
  campoExtra: {
    nombre: {
      type: String,
      required: true,
      enum: ['compania', 'autor', 'talla', 'marca', 'edadRecomendada']
    },
    valor: {
      type: String,
      required: true,
      trim: true
    }
  }
}, {
  timestamps: true // Añade createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Producto', productoSchema); 