import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Importamos useNavigate
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, Plus, Minus, Check, Ruler, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react'; // Importamos ArrowLeft
import PageTransition from '../components/common/PageTransition';
import { products } from '../data/products';
import RecommendedProducts from '../components/product/RecommendedProducts';

const ProductDetail = ({ cart, setCart }) => {
  const { slug } = useParams();
  const navigate = useNavigate(); // Hook para navegar atrás
  
  const product = products.find((p) => p.slug === slug);

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false); // Estado simple para abrir/cerrar la guía

  useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      setQuantity(1);
      setAddedToCart(false);
      window.scrollTo(0, 0);
    }
  }, [product, slug]);

  if (!product) {
    return (
      <PageTransition>
        <div className="container mx-auto px-6 py-40 text-center">
          <h2 className="text-3xl font-serif font-bold text-black mb-4">Producto no encontrado</h2>
          <Link to="/tienda" className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-colors">
            Volver a la Tienda
          </Link>
        </div>
      </PageTransition>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor, selecciona un talle.');
      return;
    }
    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: quantity,
      slug: product.slug,
    };

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === itemToAdd.id && item.size === itemToAdd.size
      );
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += itemToAdd.quantity;
        return updatedCart;
      } else {
        return [...prevCart, itemToAdd];
      }
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <PageTransition>
      <div className="bg-white pt-24 pb-20">
        <div className="container mx-auto px-6">
          
          {/* BOTÓN VOLVER (Navega a la página anterior) */}
          <button 
            onClick={() => navigate(-1)} 
            className="mb-8 inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver atrás
          </button>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* 1. GALERÍA DE IMÁGENES */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 flex flex-col gap-4 sticky top-28 h-fit"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {product.images.map((img, index) => (
                    <motion.img
                      key={index}
                      src={img}
                      alt={`${product.name} - Vista ${index + 1}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="w-24 h-24 object-cover rounded-xl border border-gray-100 cursor-pointer hover:border-mo-pink-600 transition-colors flex-shrink-0"
                    />
                  ))}
                </div>
              )}
            </motion.div>

            {/* 2. INFORMACIÓN Y COMPRA */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm uppercase tracking-widest text-gray-500 font-medium">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mb-6">
                {product.oldPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.oldPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-3xl font-bold text-black">
                  ${product.price.toLocaleString()}
                </span>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Selector de Talle */}
              <div className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-700 mb-4">
                  Selecciona Talle
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-3 rounded-full border-2 text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-black text-white border-black shadow-md'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cantidad y Botón Añadir */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                <div className="flex items-center border border-gray-300 rounded-full w-full sm:w-auto overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors text-gray-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 text-lg font-bold text-black">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 transition-colors text-gray-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 w-full sm:w-auto px-8 py-4 bg-mo-pink-600 text-white rounded-full font-bold text-lg hover:bg-black transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {addedToCart ? (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-5 h-5" /> Agregado!
                    </motion.span>
                  ) : (
                    'Añadir al Carrito'
                  )}
                </button>
              </div>

              {/* SECCIÓN DESPLEGABLE: ÚNICAMENTE GUÍA DE TALLES CON TABLA REAL */}
              <div className="border-t border-gray-100 pt-8 mt-8">
                <div className="border border-gray-100 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="flex justify-between items-center w-full p-5 text-left text-lg font-medium text-black hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Ruler className="w-5 h-5 text-mo-pink-600" />
                      Guía de Talles (Medidas en cm)
                    </div>
                    {showSizeGuide ? <ChevronUp /> : <ChevronDown />}
                  </button>
                  
                  <AnimatePresence>
                    {showSizeGuide && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gray-50 px-5 pb-5"
                      >
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b">
                              <tr>
                                <th className="px-4 py-3">Talle</th>
                                <th className="px-4 py-3">Busto</th>
                                <th className="px-4 py-3">Cintura</th>
                                <th className="px-4 py-3">Cadera</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="bg-white border-b hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">S</td>
                                <td className="px-4 py-3">85 - 90</td>
                                <td className="px-4 py-3">60 - 65</td>
                                <td className="px-4 py-3">90 - 95</td>
                              </tr>
                              <tr className="bg-white border-b hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">M</td>
                                <td className="px-4 py-3">90 - 95</td>
                                <td className="px-4 py-3">65 - 70</td>
                                <td className="px-4 py-3">95 - 100</td>
                              </tr>
                              <tr className="bg-white border-b hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">L</td>
                                <td className="px-4 py-3">95 - 100</td>
                                <td className="px-4 py-3">70 - 75</td>
                                <td className="px-4 py-3">100 - 105</td>
                              </tr>
                              <tr className="bg-white hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">XL</td>
                                <td className="px-4 py-3">100 - 105</td>
                                <td className="px-4 py-3">75 - 80</td>
                                <td className="px-4 py-3">105 - 110</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <p className="mt-3 text-xs text-gray-400 text-center">
                          * Las medidas son aproximadas. Si tienes dudas, contáctanos.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </motion.div>
          </div>

          <RecommendedProducts currentProductSlug={product.slug} cart={cart} setCart={setCart} />

        </div>
      </div>
    </PageTransition>
  );
};

export default ProductDetail;