import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '../../data/products';
import { fadeInUp } from '../../utils/animations';

const Filters = ({ selectedCategory, onCategoryChange, priceRange, onPriceChange }) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-2xl shadow-lg p-6 sticky top-32"
    >
      <h3 className="text-2xl font-serif mb-6">Filtros</h3>

      {/* Categories */}
      <div className="mb-8">
        <h4 className="font-semibold mb-4 text-lg">Categorías</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ x: 5 }}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                selectedCategory === category.id
                  ? 'bg-black text-white font-semibold'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="font-semibold mb-4 text-lg">Rango de Precio</h4>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-2 block">
              Mínimo: ${priceRange[0].toLocaleString()}
            </label>
            <input
              type="range"
              min="0"
              max="25000"
              step="1000"
              value={priceRange[0]}
              onChange={(e) => onPriceChange([parseInt(e.target.value), priceRange[1]])}
              className="w-full accent-black"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-2 block">
              Máximo: ${priceRange[1].toLocaleString()}
            </label>
            <input
              type="range"
              min="0"
              max="25000"
              step="1000"
              value={priceRange[1]}
              onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full accent-black"
            />
          </div>
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-8">
        <h4 className="font-semibold mb-4 text-lg">Talles</h4>
        <div className="grid grid-cols-3 gap-2">
          {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
            <button
              key={size}
              className="py-2 border-2 border-gray-200 rounded-lg hover:border-black transition-colors font-semibold"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="mb-8">
        <h4 className="font-semibold mb-4 text-lg">Colores</h4>
        <div className="grid grid-cols-4 gap-3">
          {[
            { name: 'Negro', color: '#000000' },
            { name: 'Blanco', color: '#FFFFFF' },
            { name: 'Rosa', color: '#FFC6E0' },
            { name: 'Gris', color: '#9CA3AF' },
            { name: 'Navy', color: '#1E3A8A' },
            { name: 'Beige', color: '#D4C5B9' },
            { name: 'Lavanda', color: '#E6E6FA' },
            { name: 'Mint', color: '#B2F5EA' }
          ].map((colorItem) => (
            <button
              key={colorItem.name}
              className="w-12 h-12 rounded-full border-2 border-gray-200 hover:border-black hover:scale-110 transition-all"
              style={{ backgroundColor: colorItem.color }}
              title={colorItem.name}
            />
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          onCategoryChange('all');
          onPriceChange([0, 25000]);
        }}
        className="w-full py-3 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
      >
        Limpiar Filtros
      </button>
    </motion.div>
  );
};

export default Filters;