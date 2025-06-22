import React from 'react';

const FiltrosAjustes = ({
  precioMin,
  precioMax,
  onPrecioMinChange,
  onPrecioMaxChange,
  valoracionMin,
  valoracionMax,
  onValoracionMinChange,
  onValoracionMaxChange,
  maxPrice
}) => {
  return (
    <div className="bg-light p-3 rounded mb-3 w-100">
      <div className="mb-3">
        <label className="form-label">
          Precio: {precioMin}€ - {precioMax}€
        </label>
        <div className="dual-slider-container">
          {/* Slider superior: track transparente para no tapar el thumb inferior */}
          <input
            id="precioMin"
            type="range"
            className="form-range dual-range"
            min="0"
            max={maxPrice}
            step="1"
            value={precioMin}
            onChange={onPrecioMinChange}
          />
          {/* Slider inferior: ambos tienen el mismo máximo */}
          <input
            id="precioMax"
            type="range"
            className="form-range dual-range"
            min="0"
            max={maxPrice}
            step="1"
            value={precioMax}
            onChange={onPrecioMaxChange}
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">
          Valoración: {valoracionMin}★ - {valoracionMax}★
        </label>
        <div className="dual-slider-container">
          <input
            id="valoracionMin"
            type="range"
            className="form-range dual-range"
            min="1"
            max="5"
            step="1"
            value={valoracionMin}
            onChange={onValoracionMinChange}
          />
          <input
            id="valoracionMax"
            type="range"
            className="form-range dual-range"
            min="1"
            max="5"
            step="1"
            value={valoracionMax}
            onChange={onValoracionMaxChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FiltrosAjustes;
