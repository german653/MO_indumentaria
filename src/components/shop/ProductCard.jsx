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
      // CAMBIOS AQUÍ:
      // 1. 'p-3': Agrega espacio interno (el marco blanco).
      // 2. 'border border-gray-200': Dibuja la línea del borde de la carta.
      // 3. 'shadow-sm': Una sombra muy suave para que se despegue del fondo.
      className="flex flex-col h-full bg-white rounded-[20px] border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* 1. IMAGEN */}
      {/* Ahora tiene 'rounded-xl' para que las esquinas de la foto sean un poco menos redondas que las de la carta */}
      <Link to={`/producto/${product.slug}`} className="block relative bg-gray-100 aspect-[4/5] overflow-hidden rounded-xl">
        {/* Badge (Etiqueta) */}
        {product.tag && (
          <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-white/90 backdrop-blur-sm text-black text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm border border-gray-100">
            {product.tag}
          </div>
        )}

        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover" // Imagen estática, sin zoom
        />
      </Link>

      {/* 2. INFORMACIÓN */}
      <div className="flex flex-col flex-1 pt-3 px-1">
        
        {/* Categoría */}
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium mb-1">
          {product.category_name || 'Colección'}
        </p>
        
        {/* Nombre y Precio */}
        <div className="mb-3">
          <Link to={`/producto/${product.slug}`}>
            <h3 className="font-serif text-base leading-tight text-gray-900 line-clamp-2 mb-1">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center gap-2">
             <span className="font-bold text-gray-900 text-sm">
               ${product.price.toLocaleString()}
             </span>
             {product.old_price > 0 && (
               <span className="text-xs text-gray-400 line-through">
                 ${product.old_price.toLocaleString()}
               </span>
             )}
          </div>
        </div>

        {/* Espaciador para empujar el botón al fondo */}
        <div className="mt-auto"></div>

        {/* 3. BOTÓN */}
        <Link to={`/producto/${product.slug}`} className="w-full">
          <button className="w-full py-2.5 bg-black text-white rounded-lg font-medium text-xs hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
            Ver Detalles
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;