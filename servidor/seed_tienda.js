const mongoose = require('mongoose');
const Producto = require('./modelos/Producto');

const mongoURI = 'mongodb://localhost:27017/tienda';

// Conectar a MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ Conectado a MongoDB para poblar la base de datos con productos de tienda.js');
  })
  .catch((error) => {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  });

// Productos extraídos de src/tienda/tienda.js
const productosTienda = [
  // Videojuegos
  {
    tipo: 'videojuego',
    nombre: 'Super Mario',
    precio: 50,
    descripcion: 'Super Mario es un ícono mundial del entretenimiento. En este juego, Mario, un fontanero con un inconfundible bigote, se embarca en una aventura épica a través de niveles llenos de enemigos, obstáculos y mundos vibrantes. La jugabilidad, combinada con una música inolvidable y gráficos coloridos, ha marcado generaciones y sigue siendo un referente en el género de plataformas. Su narrativa simple y su acción constante invitan a jugadores de todas las edades a disfrutar de una experiencia atemporal llena de desafíos y sorpresas. ',
    imagen: '/imagenes/productos/videojuego/mario.jpg',
    campoExtra: { nombre: 'compania', valor: 'Nintendo' },
    valoracion: 5
  },
  {
    tipo: 'videojuego',
    nombre: 'The Legend of Zelda',
    precio: 60,
    descripcion: 'The Legend of Zelda es una saga legendaria que invita a explorar un mundo lleno de misterio, magia y aventuras épicas. En este título, Link debe embarcarse en una travesía por tierras encantadas, resolver acertijos ingeniosos y enfrentar a enemigos temibles para salvar el reino de Hyrule y rescatar a la princesa Zelda. La atmósfera, el diseño de los escenarios y la profundidad de la narrativa crean una experiencia inmersiva que combina acción, exploración y rompecabezas, convirtiéndolo en una obra maestra de la aventura.',
    imagen: '/imagenes/productos/videojuego/zelda.jpg',
    campoExtra: { nombre: 'compania', valor: 'Nintendo' },
    valoracion: 4
  },
  {
    tipo: 'videojuego',
    nombre: 'Call of Duty',
    precio: 40,
    descripcion: 'Call of Duty es un shooter en primera persona que ofrece una experiencia intensa y realista de combate moderno. Con misiones cargadas de adrenalina, escenarios detallados y una narrativa cinematográfica, el juego pone a prueba la estrategia y los reflejos del jugador en batallas militares contemporáneas. Su jugabilidad pulida y su modo multijugador lo han consolidado como uno de los referentes del género, ofreciendo acción y emoción en cada enfrentamiento.',
    imagen: '/imagenes/productos/videojuego/cod.jpg',
    campoExtra: { nombre: 'compania', valor: 'Activision' },
    valoracion: 3
  },
  // Libros
  {
    tipo: 'libro',
    nombre: 'Cien Años de Soledad',
    precio: 20,
    descripcion: 'Esta obra maestra del realismo mágico narra la saga de la familia Buendía a lo largo de generaciones en el mítico pueblo de Macondo. Con una prosa rica y simbólica, el libro explora temas universales como el amor, la soledad, el destino y la lucha contra el olvido, ofreciendo una experiencia literaria profunda y emocionalmente intensa que ha cautivado a lectores de todo el mundo.',
    imagen: '/imagenes/productos/libro/libro.jpg',
    campoExtra: { nombre: 'autor', valor: 'Gabriel García Márquez' },
    valoracion: 3
  },
  {
    tipo: 'libro',
    nombre: 'El Quijote',
    precio: 25,
    descripcion: 'El Quijote es una sátira brillante y trágica que sigue las aventuras de un caballero andante y su fiel escudero en una España llena de fantasía y realidad. Con humor, melancolía y un agudo sentido crítico, la obra explora la locura, la ilusión y la lucha por la dignidad, convirtiéndose en una pieza fundamental de la literatura universal.',
    imagen: '/imagenes/productos/libro/quijote.jpg',
    campoExtra: { nombre: 'autor', valor: 'Miguel de Cervantes' },
    valoracion: 4
  },
  {
    tipo: 'libro',
    nombre: '1984',
    precio: 18,
    descripcion: '1984 es una distopía impactante que describe un futuro totalitario en el que el control social, la vigilancia constante y la manipulación de la información han aniquilado la libertad individual. Con una narrativa poderosa y perturbadora, la novela advierte sobre los peligros de la opresión política y la pérdida de la privacidad, marcando un antes y un después en la literatura moderna.',
    imagen: '/imagenes/productos/libro/1984.jpg',
    campoExtra: { nombre: 'autor', valor: 'George Orwell' },
    valoracion: 2
  },
  // Ropa
  {
    tipo: 'ropa',
    nombre: 'Camiseta Deportiva',
    precio: 15,
    descripcion: 'Camiseta cómoda y ligera para el día a día.',
    imagen: '/imagenes/productos/ropa/camiseta.jpg',
    campoExtra: { nombre: 'talla', valor: 'M' },
    valoracion: 3
  },
  {
    tipo: 'ropa',
    nombre: 'Pantalón Vaquero',
    precio: 30,
    descripcion: 'Vaqueros de corte clásico y resistente.',
    imagen: '/imagenes/productos/ropa/vaquero.jpg',
    campoExtra: { nombre: 'talla', valor: 'L' },
    valoracion: 2
  },
  {
    tipo: 'ropa',
    nombre: 'Chaqueta de Invierno',
    precio: 50,
    descripcion: 'Chaqueta cálida y práctica para el frío.',
    imagen: '/imagenes/productos/ropa/chaqueta.jpg',
    campoExtra: { nombre: 'talla', valor: 'XL' },
    valoracion: 4
  },
  // Electrónica
  {
    tipo: 'electronica',
    nombre: 'Smartphone X',
    precio: 300,
    descripcion: 'El Smartphone X combina tecnología de punta con un diseño elegante y funcional. Con una pantalla de alta resolución, múltiples cámaras avanzadas y un rendimiento excepcional, este dispositivo ofrece una experiencia multimedia inigualable y una conectividad de última generación. Ideal para profesionales y entusiastas, su batería de larga duración y su sistema operativo optimizado lo convierten en una herramienta indispensable.',
    imagen: '/imagenes/productos/electronica/smartphone.jpg',
    campoExtra: { nombre: 'marca', valor: 'BrandX' },
    valoracion: 1
  },
  {
    tipo: 'electronica',
    nombre: 'Laptop Pro',
    precio: 800,
    descripcion: 'La Laptop Pro es una máquina de alto rendimiento diseñada para profesionales exigentes. Con un procesador potente, gráficos avanzados y un diseño delgado y robusto, permite realizar tareas creativas y exigentes con total fluidez. Su amplia conectividad y batería de larga duración la hacen perfecta para trabajar en cualquier entorno, ofreciendo eficiencia y portabilidad.',
    imagen: '/imagenes/productos/electronica/laptop.jpg',
    campoExtra: { nombre: 'marca', valor: 'TechBrand' },
    valoracion: 5
  },
  {
    tipo: 'electronica',
    nombre: 'Auriculares Bluetooth',
    precio: 60,
    descripcion: 'Estos auriculares Bluetooth ofrecen una calidad de sonido superior gracias a su tecnología de cancelación de ruido y diseño ergonómico. Con conectividad inalámbrica estable y una batería de larga duración, son ideales para disfrutar de la música y las llamadas sin cables, proporcionando una experiencia auditiva envolvente y cómoda.',
    imagen: '/imagenes/productos/electronica/auriculares.jpg',
    campoExtra: { nombre: 'marca', valor: 'SoundMax' },
    valoracion: 3
  },
  // Juguetes
  {
    tipo: 'juguete',
    nombre: 'Coche de Carreras',
    precio: 25,
    descripcion: 'Este coche de carreras a control remoto ofrece una experiencia emocionante y realista. Con un diseño aerodinámico y controles precisos, permite competir en pistas desafiantes y mejorar la coordinación. Su robustez, velocidad y batería de larga duración garantizan horas de diversión y competición para niños y jóvenes amantes de la velocidad.',
    imagen: '/imagenes/productos/juguete/coche.jpg',
    campoExtra: { nombre: 'edadRecomendada', valor: '5+' },
    valoracion: 5
  },
  {
    tipo: 'juguete',
    nombre: 'Puzzle 100 Piezas',
    precio: 15,
    descripcion: 'Este puzzle de 100 piezas es un reto ideal para desarrollar la concentración y habilidades cognitivas. Cada pieza encaja perfectamente para revelar una imagen sorprendente, y su diseño atractivo lo convierte en una actividad lúdica y educativa que fascina tanto a niños como a adultos.',
    imagen: '/imagenes/productos/juguete/puzzle.jpg',
    campoExtra: { nombre: 'edadRecomendada', valor: '8+' },
    valoracion: 1
  },
  {
    tipo: 'juguete',
    nombre: 'Lego Construcción',
    precio: 30,
    descripcion: 'El set de Lego Construcción ofrece una experiencia creativa sin límites, permitiendo construir diversas figuras y estructuras. Con piezas interconectables y diseños innovadores, este juguete fomenta la imaginación, el desarrollo de habilidades motoras y la resolución de problemas, proporcionando horas de entretenimiento y aprendizaje.',
    imagen: '/imagenes/productos/juguete/lego.jpg',
    campoExtra: { nombre: 'edadRecomendada', valor: '6+' },
    valoracion: 3
  }
];

// Función para poblar la base de datos
async function poblarProductosTienda() {
  try {
    await Producto.deleteMany({});
    console.log('🗑️  Colección de productos limpiada');

    const productosCreados = await Producto.insertMany(productosTienda);
    console.log(`📦 ${productosCreados.length} productos de tienda.js insertados correctamente`);
  } catch (error) {
    console.error('❌ Error insertando productos de tienda.js:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Conexión cerrada');
  }
}

poblarProductosTienda(); 