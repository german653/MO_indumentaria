import React from 'react';

// Recibe 'categories' desde Shop
const Filters = ({ categories = [], selectedCategory, onCategoryChange, priceRange, onPriceChange }) => {
  
  const handlePriceChange = (e) => {
    onPriceChange([0, parseInt(e.target.value)]);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
      <h3 className="text-xl font-serif font-bold mb-6">Filtros</h3>

      {/* CATEGORÍAS */}
      <div className="mb-10">
        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
          Categoría
        </h4>
        <div className="space-y-1">
          {/* Botón "Ver Todo" */}
          <button
            onClick={() => onCategoryChange('all')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
              selectedCategory === 'all'
                ? 'bg-black text-white font-medium shadow-md'
                : 'text-gray-600 hover:bg-gray-50 hover:text-black'
            }`}
          >
            Ver Todo
          </button>

          {/* Categorías Dinámicas desde DB */}
          {categories.map((category) => (
            <button
              key={category.id}
              // Usamos el nombre como ID si no hay slug definido, o category.name
              onClick={() => onCategoryChange(category.name)} 
              className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
                selectedCategory === category.name
                  ? 'bg-black text-white font-medium shadow-md'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-black'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* RANGO DE PRECIO */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Precio Máximo
          </h4>
          <span className="text-sm font-bold text-black">
            ${priceRange[1].toLocaleString()}
          </span>
        </div>
        
        <input
          type="range"
          min="0"
          max="500000"
          step="5000"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium">
          <span>$0</span>
          <span>$500.000+</span>
        </div>
      </div>

    </div>
  );
};

export default Filters;