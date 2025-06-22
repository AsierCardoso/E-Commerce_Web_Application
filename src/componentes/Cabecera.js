// src/componentes/Cabecera.js
import React from 'react';

const Cabecera = ({ titulo }) => {
  return (
    <header className="bg-primary text-white text-center py-3 rounded-bottom">
      <h1>{titulo}</h1>
    </header>
  );
};

export default Cabecera;