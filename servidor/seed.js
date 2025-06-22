const mongoose = require('mongoose');
const Usuario = require('./modelos/Usuario');
const Producto = require('./modelos/Producto');

const mongoURI = 'mongodb://localhost:27017/tienda';

// Conectar a MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ Conectado a MongoDB para poblar la base de datos');
  })
  .catch((error) => {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  });

// Datos de usuarios de prueba
const usuariosPrueba = [
  {
    nombre: 'Admin Principal',
    email: 'admin@tienda.com',
    rol: 'admin',
    telefono: '123456789',
    direccion: 'Calle Principal 123',
    fechaNacimiento: new Date('1990-01-01')
  },
  {
    nombre: 'Usuario Normal',
    email: 'usuario@tienda.com',
    rol: 'usuario',
    telefono: '987654321',
    direccion: 'Avenida Secundaria 456',
    fechaNacimiento: new Date('1995-05-15')
  }
];

// Datos de productos de prueba
const productosPrueba = [
  {
    tipo: 'videojuego',
    nombre: 'Super Mario',
    precio: 50,
    descripcion: 'Super Mario es un ícono mundial del entretenimiento...',
    imagen: '/imagenes/productos/videojuego/mario.jpg',
    valoracion: 5,
    campoExtra: {
      nombre: 'compania',
      valor: 'Nintendo'
    }
  },
  {
    tipo: 'libro',
    nombre: 'Cien Años de Soledad',
    precio: 20,
    descripcion: 'Esta obra maestra del realismo mágico...',
    imagen: '/imagenes/productos/libro/libro.jpg',
    valoracion: 3,
    campoExtra: {
      nombre: 'autor',
      valor: 'Gabriel García Márquez'
    }
  },
  {
    tipo: 'ropa',
    nombre: 'Camiseta Deportiva',
    precio: 15,
    descripcion: 'Camiseta cómoda y ligera para el día a día.',
    imagen: '/imagenes/productos/ropa/camiseta.jpg',
    valoracion: 3,
    campoExtra: {
      nombre: 'talla',
      valor: 'M'
    }
  },
  {
    tipo: 'electronica',
    nombre: 'Smartphone X',
    precio: 300,
    descripcion: 'El Smartphone X combina tecnología de punta...',
    imagen: '/imagenes/productos/electronica/smartphone.jpg',
    valoracion: 1,
    campoExtra: {
      nombre: 'marca',
      valor: 'BrandX'
    }
  },
  {
    tipo: 'juguete',
    nombre: 'Coche de Carreras',
    precio: 25,
    descripcion: 'Este coche de carreras a control remoto...',
    imagen: '/imagenes/productos/juguete/coche.jpg',
    valoracion: 5,
    campoExtra: {
      nombre: 'edadRecomendada',
      valor: '5+'
    }
  }
];

// Función para poblar la base de datos
async function poblarBaseDeDatos() {
  try {
    // Limpiar colecciones existentes
    await Usuario.deleteMany({});
    await Producto.deleteMany({});
    
    console.log('🗑️  Colecciones limpiadas');
    
    // Insertar usuarios
    const usuariosCreados = await Usuario.insertMany(usuariosPrueba);
    console.log(`👥 ${usuariosCreados.length} usuarios creados`);
    
    // Insertar productos
    const productosCreados = await Producto.insertMany(productosPrueba);
    console.log(`📦 ${productosCreados.length} productos creados`);
    
    console.log('✅ Base de datos poblada correctamente');
    console.log('\n📋 Usuarios de prueba:');
    console.log('- admin@tienda.com (admin)');
    console.log('- usuario@tienda.com (usuario)');
    
  } catch (error) {
    console.error('❌ Error poblando la base de datos:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Conexión cerrada');
  }
}

// Ejecutar el script
poblarBaseDeDatos(); 