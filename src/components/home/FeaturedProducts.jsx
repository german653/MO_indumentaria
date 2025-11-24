import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from '../shop/ProductCard'; // Importamos la tarjeta oficial
import { products } from '../../data/products'; // Tus datos

const FeaturedProducts = ({ cart, setCart }) => {
  // Filtramos solo los que tienen featured: true y mostramos máximo 4 u 8
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  // Animaciones para el contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2 // Efecto cascada entre productos
      }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* 1. ENCABEZADO DE SECCIÓN */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-black"></span>
              <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Colección Selecta</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4">
              Favoritos de la <span className="text-mo-pink-600 italic">Semana</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Las prendas más buscadas, elegidas por su diseño y confort.
            </p>
          </motion.div>

          {/* Botón "Ver Todo" (Visible en Desktop) */}
          <Link to="/tienda" className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white border-2 border-black text-black rounded-full font-bold hover:bg-black hover:text-white transition-all flex items-center gap-2 group"
            >
              Ver toda la tienda
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>

        {/* 2. GRILLA DE PRODUCTOS */}
        {/* Mobile: 2 columnas | Desktop: 4 columnas */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
        >
          {featuredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
              cart={cart}
              setCart={setCart}
            />
          ))}
        </motion.div>

        {/* 3. BOTÓN MÓVIL (Solo aparece en celulares al final) */}
        <div className="mt-12 text-center md:hidden">
          <Link to="/tienda">
            <button className="w-full px-8 py-4 bg-black text-white rounded-full font-bold shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2">
              Ver todos los productos
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;