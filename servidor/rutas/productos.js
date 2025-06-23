const express = require('express');
const router = express.Router();
const Producto = require('../modelos/Producto');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configurar multer para subida de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Obtener el tipo del producto desde la query string de la URL
    const tipo = req.query.tipo || 'otros';
    const uploadDir = path.join(__dirname, '../../public/imagenes/productos', tipo);
    
    // Crear directorio si no existe
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generar nombre único para la imagen
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Verificar tipo de archivo
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB máximo
  }
});

// GET /api/productos - Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/productos - Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    console.error('Error creando producto:', error);
    res.status(400).json({ error: 'Error al crear el producto' });
  }
});

// POST /api/productos/upload-image - Subir imagen de producto
router.post('/upload-image', upload.single('imagen'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se ha subido ningún archivo' });
    }
    
    // Obtener el tipo del producto desde la query string
    const tipo = req.query.tipo || 'otros';
    
    // Devolver la ruta de la imagen subida incluyendo el tipo
    const imagePath = `/imagenes/productos/${tipo}/${req.file.filename}`;
    res.json({ 
      success: true, 
      imagePath: imagePath,
      filename: req.file.filename 
    });
  } catch (error) {
    console.error('Error subiendo imagen:', error);
    res.status(500).json({ error: 'Error al subir la imagen' });
  }
});

// PUT /api/productos/:id - Actualizar un producto existente
router.put('/:id', async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json(productoActualizado);
  } catch (error) {
    console.error('Error actualizando producto:', error);
    res.status(400).json({ error: 'Error al actualizar el producto' });
  }
});

// DELETE /api/productos/:id - Eliminar un producto específico
router.delete('/:id', async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    
    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error eliminando producto:', error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

// DELETE /api/productos - Borrar productos seleccionados
router.delete('/', async (req, res) => {
  try {
    const { ids } = req.body; // Array de IDs a borrar
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Se requiere un array de IDs válido' });
    }
    
    const resultado = await Producto.deleteMany({ _id: { $in: ids } });
    
    res.json({ 
      mensaje: `${resultado.deletedCount} producto(s) eliminado(s) correctamente`,
      eliminados: resultado.deletedCount
    });
  } catch (error) {
    console.error('Error borrando productos:', error);
    res.status(500).json({ error: 'Error al borrar los productos' });
  }
});

module.exports = router; 