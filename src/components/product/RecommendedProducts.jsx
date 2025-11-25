import React from 'react';
import { motion } from 'framer-motion';
import { products } from '../../data/products';
import ProductCard from '../shop/ProductCard';

const RecommendedProducts = ({ currentProductSlug, cart, setCart }) => {
  // Filtramos productos que no sean el actual y que sean de la misma categoría o tags similares
  // Por ahora, solo excluiremos el actual. Puedes añadir lógica más compleja si quieres.
  const recommended = products.filter(p => p.slug !== currentProductSlug).slice(0, 4);

  if (recommended.length === 0) {
    return null; // No muestra la sección si no hay recomendaciones
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="pt-20 mt-16 border-t border-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-4">
          Completá tu <span className="italic text-mo-pink-600">Look</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Otros productos que te pueden gustar para combinar.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
      >
        {recommended.map((product, index) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            index={index} 
            cart={cart} 
            setCart={setCart} 
          />
        ))}
      </motion.div>
    </section>
  );
};

export default RecommendedProducts;