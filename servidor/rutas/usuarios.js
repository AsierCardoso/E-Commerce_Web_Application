const express = require('express');
const router = express.Router();
const Usuario = require('../modelos/Usuario');

// POST /api/usuarios/login - Login de usuario
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    // Buscar usuario en la base de datos
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }
    // Regenerar la sesión para evitar problemas
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ error: 'Error regenerando sesión' });
      }
      // Crear sesión
      req.session.userId = usuario._id;
      req.session.email = usuario.email;
      req.session.rol = usuario.rol;
      req.session.visitas = 1; // Inicializar contador de visitas
      req.session.save((err) => {
        if (err) {
          return res.status(500).json({ error: 'Error guardando sesión' });
        }
        res.json({
          mensaje: 'Login exitoso',
          usuario: {
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
            telefono: usuario.telefono,
            direccion: usuario.direccion,
            fechaNacimiento: usuario.fechaNacimiento
          },
          visitas: req.session.visitas
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/usuarios/logout - Logout de usuario
router.post('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error('Error destruyendo sesión:', error);
      return res.status(500).json({ error: 'Error al cerrar sesión' });
    }
    res.json({ mensaje: 'Logout exitoso' });
  });
});

// GET /api/usuarios/perfil - Obtener perfil del usuario autenticado
router.get('/perfil', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    // Incrementar contador de visitas
    req.session.visitas = (req.session.visitas || 0) + 1;
    
    const usuario = await Usuario.findById(req.session.userId);
    
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json({
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        telefono: usuario.telefono,
        direccion: usuario.direccion,
        fechaNacimiento: usuario.fechaNacimiento
      },
      visitas: req.session.visitas
    });
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// PUT /api/usuarios/perfil - Actualizar perfil del usuario
router.put('/perfil', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    const { nombre, telefono, direccion, fechaNacimiento } = req.body;
    
    // Validar que el nombre no esté vacío
    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ error: 'El nombre no puede estar vacío' });
    }
    
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.session.userId,
      {
        nombre: nombre.trim(),
        telefono,
        direccion,
        fechaNacimiento
      },
      { new: true, runValidators: true }
    );
    
    if (!usuarioActualizado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json({
      mensaje: 'Perfil actualizado correctamente',
      usuario: {
        id: usuarioActualizado._id,
        nombre: usuarioActualizado.nombre,
        email: usuarioActualizado.email,
        rol: usuarioActualizado.rol,
        telefono: usuarioActualizado.telefono,
        direccion: usuarioActualizado.direccion,
        fechaNacimiento: usuarioActualizado.fechaNacimiento
      }
    });
  } catch (error) {
    console.error('Error actualizando perfil:', error);
    res.status(400).json({ error: 'Error al actualizar el perfil' });
  }
});

// GET /api/usuarios/check-auth - Verificar si el usuario está autenticado
router.get('/check-auth', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ autenticado: false });
    }
    req.session.visitas = (req.session.visitas || 0) + 1;
    const usuario = await Usuario.findById(req.session.userId);
    if (!usuario) {
      return res.status(401).json({ autenticado: false });
    }
    res.json({
      autenticado: true,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        telefono: usuario.telefono,
        direccion: usuario.direccion,
        fechaNacimiento: usuario.fechaNacimiento
      },
      visitas: req.session.visitas
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router; 