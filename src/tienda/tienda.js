// tienda.js
// Imports
import {Videojuego, Libro, Ropa, Electronica, Juguete} from './clases.js';

// Variables globales para paginación
let currentPage = 1;
const productsPerPage = 9;
let listaActual = []; 

// Array de productos base y del carrito
let productos = [
    // Instancias de Videojuego 
    new Videojuego('Super Mario', 50, 'Super Mario es un ícono mundial del entretenimiento. En este juego, Mario, un fontanero con un inconfundible bigote, se embarca en una aventura épica a través de niveles llenos de enemigos, obstáculos y mundos vibrantes. La jugabilidad, combinada con una música inolvidable y gráficos coloridos, ha marcado generaciones y sigue siendo un referente en el género de plataformas. Su narrativa simple y su acción constante invitan a jugadores de todas las edades a disfrutar de una experiencia atemporal llena de desafíos y sorpresas. ', '/imagenes/productos/videojuego/mario.jpg', 'Nintendo', 5),
    new Videojuego('The Legend of Zelda', 60, 'The Legend of Zelda es una saga legendaria que invita a explorar un mundo lleno de misterio, magia y aventuras épicas. En este título, Link debe embarcarse en una travesía por tierras encantadas, resolver acertijos ingeniosos y enfrentar a enemigos temibles para salvar el reino de Hyrule y rescatar a la princesa Zelda. La atmósfera, el diseño de los escenarios y la profundidad de la narrativa crean una experiencia inmersiva que combina acción, exploración y rompecabezas, convirtiéndolo en una obra maestra de la aventura.', '/imagenes/productos/videojuego/zelda.jpg', 'Nintendo', 4),
    new Videojuego('Call of Duty', 40, 'Call of Duty es un shooter en primera persona que ofrece una experiencia intensa y realista de combate moderno. Con misiones cargadas de adrenalina, escenarios detallados y una narrativa cinematográfica, el juego pone a prueba la estrategia y los reflejos del jugador en batallas militares contemporáneas. Su jugabilidad pulida y su modo multijugador lo han consolidado como uno de los referentes del género, ofreciendo acción y emoción en cada enfrentamiento.', '/imagenes/productos/videojuego/cod.jpg', 'Activision', 3),
  
    // Instancias de Libro 
    new Libro('Cien Años de Soledad', 20, 'Esta obra maestra del realismo mágico narra la saga de la familia Buendía a lo largo de generaciones en el mítico pueblo de Macondo. Con una prosa rica y simbólica, el libro explora temas universales como el amor, la soledad, el destino y la lucha contra el olvido, ofreciendo una experiencia literaria profunda y emocionalmente intensa que ha cautivado a lectores de todo el mundo.', '/imagenes/productos/libro/libro.jpg', 'Gabriel García Márquez', 3),
    new Libro('El Quijote', 25, 'El Quijote es una sátira brillante y trágica que sigue las aventuras de un caballero andante y su fiel escudero en una España llena de fantasía y realidad. Con humor, melancolía y un agudo sentido crítico, la obra explora la locura, la ilusión y la lucha por la dignidad, convirtiéndose en una pieza fundamental de la literatura universal.', '/imagenes/productos/libro/quijote.jpg', 'Miguel de Cervantes', 4),
    new Libro('1984', 18, '1984 es una distopía impactante que describe un futuro totalitario en el que el control social, la vigilancia constante y la manipulación de la información han aniquilado la libertad individual. Con una narrativa poderosa y perturbadora, la novela advierte sobre los peligros de la opresión política y la pérdida de la privacidad, marcando un antes y un después en la literatura moderna.', '/imagenes/productos/libro/1984.jpg', 'George Orwell',2),
  
    // Instancias de Ropa 
    new Ropa('Camiseta Deportiva', 15, 'Camiseta cómoda y ligera para el día a día.', '/imagenes/productos/ropa/camiseta.jpg', 'M', 3),
    new Ropa('Pantalón Vaquero', 30, 'Vaqueros de corte clásico y resistente.', '/imagenes/productos/ropa/vaquero.jpg', 'L', 2),
    new Ropa('Chaqueta de Invierno', 50, 'Chaqueta cálida y práctica para el frío.', '/imagenes/productos/ropa/chaqueta.jpg', 'XL', 4),
  
    // Instancias de Electronica 
    new Electronica('Smartphone X', 300, 'El Smartphone X combina tecnología de punta con un diseño elegante y funcional. Con una pantalla de alta resolución, múltiples cámaras avanzadas y un rendimiento excepcional, este dispositivo ofrece una experiencia multimedia inigualable y una conectividad de última generación. Ideal para profesionales y entusiastas, su batería de larga duración y su sistema operativo optimizado lo convierten en una herramienta indispensable.', '/imagenes/productos/electronica/smartphone.jpg', 'BrandX', 1),
    new Electronica('Laptop Pro', 800, 'La Laptop Pro es una máquina de alto rendimiento diseñada para profesionales exigentes. Con un procesador potente, gráficos avanzados y un diseño delgado y robusto, permite realizar tareas creativas y exigentes con total fluidez. Su amplia conectividad y batería de larga duración la hacen perfecta para trabajar en cualquier entorno, ofreciendo eficiencia y portabilidad.', '/imagenes/productos/electronica/laptop.jpg', 'TechBrand',5),
    new Electronica('Auriculares Bluetooth', 60, 'Estos auriculares Bluetooth ofrecen una calidad de sonido superior gracias a su tecnología de cancelación de ruido y diseño ergonómico. Con conectividad inalámbrica estable y una batería de larga duración, son ideales para disfrutar de la música y las llamadas sin cables, proporcionando una experiencia auditiva envolvente y cómoda.', '/imagenes/productos/electronica/auriculares.jpg', 'SoundMax',3),
  
    // Instancias de Juguete 
    new Juguete('Coche de Carreras', 25, 'Este coche de carreras a control remoto ofrece una experiencia emocionante y realista. Con un diseño aerodinámico y controles precisos, permite competir en pistas desafiantes y mejorar la coordinación. Su robustez, velocidad y batería de larga duración garantizan horas de diversión y competición para niños y jóvenes amantes de la velocidad.', '/imagenes/productos/juguete/coche.jpg', '5+', 5),
    new Juguete('Puzzle 100 Piezas', 15, 'Este puzzle de 100 piezas es un reto ideal para desarrollar la concentración y habilidades cognitivas. Cada pieza encaja perfectamente para revelar una imagen sorprendente, y su diseño atractivo lo convierte en una actividad lúdica y educativa que fascina tanto a niños como a adultos.', '/imagenes/productos/juguete/puzzle.jpg', '8+', 1),
    new Juguete('Lego Construcción', 30, 'El set de Lego Construcción ofrece una experiencia creativa sin límites, permitiendo construir diversas figuras y estructuras. Con piezas interconectables y diseños innovadores, este juguete fomenta la imaginación, el desarrollo de habilidades motoras y la resolución de problemas, proporcionando horas de entretenimiento y aprendizaje.', '/imagenes/productos/juguete/lego.jpg', '6+', 3)
  ];
  

let carrito = [];

// Función para guardar o actualizar un producto del carrito en localStorage
export function guardarEnCarrito(producto) {
  const key = 'producto_' + producto.id;
  const data = {
    nombre: producto.nombre,
    precio: producto.precio,
    imagen: producto.imagen,
    cantidad: producto.cantidad
  };
  localStorage.setItem(key, JSON.stringify(data));
}

// Función para borrar un producto del carrito de localStorage
export function borrarDelCarrito(id) {
  const key = 'producto_' + id;
  localStorage.removeItem(key);
}

// Función para cargar el carrito desde localStorage
export function cargarCarrito() {
  const carritoLocal = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('producto_')) {
      try {
        const item = JSON.parse(localStorage.getItem(key));
        // Asignamos el id extraído de la clave para mantener la consistencia
        item.id = key.substring('producto_'.length);
        carritoLocal.push(item);
      } catch (error) {
        console.error(`Error al parsear la clave ${key}:`, error);
      }
    }
  }
  return carritoLocal;
}

export { productos, carrito, listaActual, setListaActual, setCarrito, setCurrentPage, productsPerPage, currentPage};