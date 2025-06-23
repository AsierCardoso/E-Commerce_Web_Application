// servidor/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const port = 4000; // Puerto para el servidor

// Configuración de MongoDB
const mongoURI = 'mongodb://localhost:27017/tienda';

// Conectar a MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ Conexión a MongoDB establecida correctamente');
  })
  .catch((error) => {
    console.error('❌ Error conectando a MongoDB:', error);
  });

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Configuración de sesiones
app.use(session({
  secret: 'tienda-dawe-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: mongoURI,
    collectionName: 'sessions'
  }),
  cookie: {
    secure: false, // Cambiar a true en producción con HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
    sameSite: 'lax'
  }
}));

// Ruta de prueba
app.get('/test', (req, res) => {
  res.json({ mensaje: 'Ruta de prueba funcionando correctamente' });
});

// Rutas
app.use('/api/productos', require('./rutas/productos'));
app.use('/api/usuarios', require('./rutas/usuarios'));

app.get('/', (req, res) => {
  res.send('Servidor de la Tienda DAWE funcionando!');
});

app.listen(port, () => {
  console.log(`🚀 Servidor Express escuchando en http://localhost:${port}`);
  console.log(`📊 Base de datos: ${mongoURI}`);
}); 