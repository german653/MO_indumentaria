import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/animations';

const ProductCard = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
    >
      {/* Badge (Etiqueta: Nuevo, Oferta, etc.) */}
      {product.tag && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-sm">
          {product.tag}
        </div>
      )}

      {/* Imagen y Link Principal */}
      <Link to={`/producto/${product.slug}`} className="block relative overflow-hidden">
        <div className="relative aspect-[3/4] bg-gray-100">
          {/* Imagen Principal */}
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Segunda imagen al pasar el mouse (Efecto Hover) */}
          {product.images?.[1] && (
            <img
              src={product.images[1]}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
          )}
        </div>
      </Link>

      {/* Información del Producto (Sin colores ni corazones) */}
      <div className="p-5 text-center">
        {/* Categoría */}
        <p className="text-xs text-gray-400 mb-2 uppercase tracking-widest">
          {product.category}
        </p>

        {/* Nombre */}
        <Link to={`/producto/${product.slug}`}>
          <h3 className="font-serif font-bold text-lg mb-2 text-gray-900 group-hover:text-mo-pink-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Precio */}
        <div className="flex items-center justify-center gap-3">
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.oldPrice.toLocaleString()}
            </span>
          )}
          <span className="text-lg font-medium text-black">
            ${product.price.toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;