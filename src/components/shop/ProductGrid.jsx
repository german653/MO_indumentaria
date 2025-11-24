import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { staggerContainer, fadeInUp } from '../../utils/animations';

const ProductGrid = ({ products, cart, setCart }) => {
  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20"
      >
        <div className="w-32 h-32 bg-mo-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-6xl">😕</span>
        </div>
        <h3 className="text-2xl font-serif mb-2">No encontramos productos</h3>
        <p className="text-gray-600">Intenta ajustar los filtros</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          cart={cart}
          setCart={setCart}
        />
      ))}
    </motion.div>
  );
};

export default ProductGrid;