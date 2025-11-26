import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// BORRAR: import { products } from '../../data/products'; 
import { productService } from '../../lib/supabase'; // AGREGAR ESTO
import ProductCard from '../shop/ProductCard';

const RecommendedProducts = ({ currentProductSlug, cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // AGREGAR: Efecto para cargar productos desde Supabase
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Traemos los productos (podrías optimizar esto en el futuro para traer solo algunos)
        const data = await productService.getAll();
        setProducts(data || []);
      } catch (error) {
        console.error('Error al cargar recomendaciones:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Lógica de filtrado aplicada sobre los datos traídos de la BD
  const recommended = products
    .filter(p => p.slug !== currentProductSlug && p.active) // Aseguramos que estén activos
    .slice(0, 4);

  if (loading) return null; // O un spinner pequeño

  if (recommended.length === 0) {
    return null;
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
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
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