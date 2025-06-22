// clases.js

import { guidGenerator } from './utils.js';

// Superclase Producto
class Producto {
  #id;
  #nombre;
  #precio;
  #descripcion;
  #imagen;
  #valoracion; // Nueva propiedad para la valoración (1 a 5)

  constructor(nombre, precio, descripcion, imagen = null, valoracion = 3) {
    this.#id = guidGenerator(); // Se genera automáticamente un ID único
    this.#nombre = nombre;
    this.#precio = precio;
    this.#descripcion = descripcion;
    this.#imagen = imagen ? imagen : '/productos/sin-imagen.png';
    this.#valoracion = (valoracion >= 1 && valoracion <= 5) ? valoracion : 3;
  }

  get id() { return this.#id; }
  get nombre() { return this.#nombre; }
  set nombre(value) { this.#nombre = value; }
  get precio() { return this.#precio; }
  set precio(value) { this.#precio = value; }
  get descripcion() { return this.#descripcion; }
  set descripcion(value) { this.#descripcion = value; }
  get imagen() { return this.#imagen; }
  set imagen(value) { this.#imagen = value; }
  get valoracion() { return this.#valoracion; }
  set valoracion(value) {
    // Solo asignamos si el valor está entre 1 y 5
    if (value >= 1 && value <= 5) {
      this.#valoracion = value;
    }
  }
}

  /* Clases que extienden de Producto */
  
  // 1. Videojuego: con atributo extra "compania"
class Videojuego extends Producto {
  #compania;
  constructor(nombre, precio, descripcion, imagen, compania, valoracion) {
    super(nombre, precio, descripcion, imagen, valoracion);
    this.#compania = compania;}
  get compania() {return this.#compania;}
  set compania(valor) {this.#compania = valor;}
}

// 2. Libro: con atributo extra "autor"
class Libro extends Producto {
  #autor;
  constructor(nombre, precio, descripcion, imagen, autor, valoracion) {
    super(nombre, precio, descripcion, imagen, valoracion);
    this.#autor = autor;
  }
  get autor() {return this.#autor;}
  set autor(valor) {this.#autor = valor;}
}

// 3. Ropa: con atributo extra "talla"
class Ropa extends Producto {
  #talla;
  constructor(nombre, precio, descripcion, imagen, talla, valoracion) {
    super(nombre, precio, descripcion, imagen, valoracion);
    this.#talla = talla;
  }
  get talla() {return this.#talla;}
  set talla(valor) {this.#talla = valor;}
}

// 4. Electronica: con atributo extra "marca"
class Electronica extends Producto {
  #marca;
  constructor(nombre, precio, descripcion, imagen, marca, valoracion) {
    super(nombre, precio, descripcion, imagen, valoracion);
    this.#marca = marca;
  }
  get marca() {return this.#marca;}
  set marca(valor) {this.#marca = valor;}
}

// 5. Juguete: con atributo extra "edadRecomendada"
class Juguete extends Producto {
  #edadRecomendada;
  constructor(nombre, precio, descripcion, imagen, edadRecomendada, valoracion) {
    super(nombre, precio, descripcion, imagen, valoracion);
    this.#edadRecomendada = edadRecomendada;
  }
  get edadRecomendada() {return this.#edadRecomendada;}
  set edadRecomendada(valor) {this.#edadRecomendada = valor;}
}

export {Videojuego, Libro, Ropa, Electronica, Juguete}