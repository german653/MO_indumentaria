import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

const ProductCard = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col"
    >
      {/* Badge (Etiqueta) */}
      {product.tag && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-sm">
          {product.tag}
        </div>
      )}

      {/* Imagen Principal (ESTÁTICA - Ya no cambia con hover) */}
      <Link to={`/producto/${product.slug}`} className="block relative overflow-hidden flex-shrink-0">
        <div className="relative aspect-[3/4] bg-gray-100">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" // Un leve zoom al pasar el mouse queda elegante, pero la imagen es la misma
          />
        </div>
      </Link>

      {/* Información del Producto */}
      <div className="p-4 md:p-5 flex-grow flex flex-col justify-between">
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-1 uppercase tracking-widest">
            {product.category}
          </p>
          <h3 className="font-serif font-bold text-lg mb-2 text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center justify-center gap-2 mb-4">
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
        
        {/* BOTÓN "VER DETALLES" */}
        <Link to={`/producto/${product.slug}`} className="w-full">
          <button className="w-full px-4 py-3 bg-black text-white rounded-full text-sm font-semibold flex items-center justify-center gap-2 hover:bg-mo-pink-600 transition-colors shadow-md group-hover:shadow-lg">
            <Eye className="w-4 h-4" />
            Ver Detalles
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;