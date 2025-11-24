import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Star } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../../utils/animations';

const RelatedProducts = ({ products }) => {
  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-serif mb-4">
          También te puede <span className="italic text-mo-pink-600">interesar</span>
        </h2>
        <p className="text-xl text-gray-600">
          Productos similares que combinan perfecto
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            variants={fadeInUp}
            whileHover={{ y: -8 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <Link to={`/producto/${product.slug}`} className="block">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                  src={product.images?.[0] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-4">
                {product.rating && (
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < product.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}

                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
                  {product.category}
                </p>

                <h3 className="font-serif font-semibold mb-2 group-hover:text-mo-pink-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <p className="text-lg font-light">${product.price.toLocaleString()}</p>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default RelatedProducts;