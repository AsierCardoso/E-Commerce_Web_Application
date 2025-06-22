const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  rol: {
    type: String,
    enum: ['admin', 'usuario'],
    default: 'usuario'
  },
  // 3 campos extra a elección del grupo
  telefono: {
    type: String,
    trim: true
  },
  direccion: {
    type: String,
    trim: true
  },
  fechaNacimiento: {
    type: Date
  }
}, {
  timestamps: true // Añade createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Usuario', usuarioSchema); 