import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Star, Heart } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../utils/animations';

const FeaturedProducts = ({ cart, setCart, products = [] }) => {
  const ProductCard = ({ product, index }) => {
    return (
      <motion.div
        variants={fadeInUp}
        whileHover={{ y: -10 }}
        className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
      >
        {product.tag && (
          <div className="absolute top-4 left-4 z-10 px-4 py-1.5 bg-black text-white text-xs font-semibold rounded-full">
            {product.tag}
          </div>
        )}

        <Link to={`/producto/${product.slug}`} className="block">
          <div className="relative overflow-hidden aspect-[3/4] bg-gray-100">
            <img
              src={product.images?.[0] || product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Link>

        <button className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110">
          <Heart className="w-5 h-5 text-black" />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm text-gray-500 ml-2">({product.reviews || 0})</span>
          </div>

          <p className="text-xs text-gray-500 mb-2 tracking-widest uppercase">
            {product.category_name || product.category}
          </p>

          <Link to={`/producto/${product.slug}`}>
            <h3 className="text-lg font-serif font-semibold mb-3 group-hover:text-mo-pink-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-light">${product.price.toLocaleString()}</p>
            <Link to={`/producto/${product.slug}`}>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  };

  if (!products || products.length === 0) {
    return (
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">No hay productos destacados disponibles</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif mb-4">
            Productos <span className="italic text-mo-pink-600">Destacados</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Piezas cuidadosamente seleccionadas para tu estilo de vida activo
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {products.slice(0, 6).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link to="/tienda">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all inline-flex items-center gap-2 shadow-xl"
            >
              Ver Toda la Colección
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;