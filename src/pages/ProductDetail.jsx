import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, Plus, Minus, Check, Ruler, ArrowLeft, Truck, ShieldCheck } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import RecommendedProducts from '../components/product/RecommendedProducts';
import { productService } from '../lib/supabase';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const ProductDetail = ({ cart, setCart }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await productService.getBySlug(slug);
        if (data) {
          setProduct(data);
          // Si tiene talles, reseteamos la selección para obligar a elegir
          if (data.sizes && data.sizes.length > 0) {
            setSelectedSize(''); 
          }
        }
      } catch (error) {
        console.error(error);
        toast.error('Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    
    // Resetear estados al cambiar de producto
    setQuantity(1);
    setActiveImage(0);
    window.scrollTo(0,0);
  }, [slug]);

  const addToCart = () => {
    if (!product) return;
    
    // Validación de talle
    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error('Por favor selecciona un talle');
      return;
    }

    setCart(prev => {
      const existing = prev.find(p => p.id === product.id && p.size === selectedSize);
      if (existing) {
        return prev.map(p => p.id === product.id && p.size === selectedSize 
          ? { ...p, quantity: p.quantity + quantity } : p
        );
      }
      return [...prev, { ...product, size: selectedSize, quantity }];
    });

    toast.success('¡Agregado al carrito!');
  };

  if (loading) return <LoadingSpinner fullScreen />;
  if (!product) return <div className="text-center py-20">Producto no encontrado</div>;

  return (
    <PageTransition>
      <div className="bg-white min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          
          {/* Botón Volver */}
          <button 
            onClick={() => navigate(-1)} 
            className="mb-6 flex items-center gap-2 text-gray-500 hover:text-black transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Volver atrás
          </button>

          {/* GRID PRINCIPAL: 2 Columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* COLUMNA IZQUIERDA: Imágenes (Ocupa 7 columnas) */}
            <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-4">
              {/* Miniaturas (Lista vertical en desktop, horizontal en mobile) */}
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:w-20 shrink-0 scrollbar-hide">
                {product.images?.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-20 lg:w-full lg:h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === i ? 'border-black' : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Imagen Principal (Contenida) */}
              <div className="flex-1 bg-gray-50 rounded-[2rem] overflow-hidden relative aspect-[4/5] lg:aspect-auto lg:h-[600px] shadow-sm border border-gray-100">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  src={product.images?.[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.tag && (
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    {product.tag}
                  </span>
                )}
              </div>
            </div>

            {/* COLUMNA DERECHA: Info (Ocupa 5 columnas y es Sticky) */}
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                
                {/* Cabecera */}
                <div className="mb-6 border-b border-gray-100 pb-6">
                  <p className="text-gray-500 text-sm font-medium tracking-widest uppercase mb-2">
                    {product.category_name || 'Colección'}
                  </p>
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4 leading-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-baseline gap-4">
                    <span className="text-3xl font-medium text-black">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.old_price > 0 && (
                      <span className="text-lg text-gray-400 line-through">
                        ${product.old_price.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Selectores */}
                <div className="space-y-6 mb-8">
                  {/* Talles */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-bold text-gray-900">Seleccionar Talle</span>
                      <button 
                        onClick={() => setShowSizeGuide(!showSizeGuide)}
                        className="text-xs text-gray-500 underline hover:text-black flex items-center gap-1"
                      >
                        <Ruler className="w-3 h-3" /> Guía de Talles
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes?.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[3.5rem] h-12 rounded-xl border flex items-center justify-center text-sm font-medium transition-all ${
                            selectedSize === size
                              ? 'border-black bg-black text-white shadow-md'
                              : 'border-gray-200 text-gray-600 hover:border-gray-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Guía de Talles Expandible */}
                  <AnimatePresence>
                    {showSizeGuide && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-gray-50 rounded-xl"
                      >
                        <div className="p-4 text-xs text-gray-600">
                          <p>S: Busto 85-90 | Cadera 90-95</p>
                          <p>M: Busto 90-95 | Cadera 95-100</p>
                          <p>L: Busto 95-100 | Cadera 100-105</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Cantidad */}
                  <div>
                    <span className="text-sm font-bold text-gray-900 mb-3 block">Cantidad</span>
                    <div className="inline-flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Botón de Compra */}
                <button
                  onClick={addToCart}
                  className="w-full py-4 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 active:scale-95"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Agregar al Carrito
                </button>

                {/* Beneficios (SIN Envío Gratis) */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Truck className="w-5 h-5 text-green-600" /> Envíos a todo el país
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <ShieldCheck className="w-5 h-5 text-blue-600" /> Compra Segura
                  </div>
                </div>
                
                {/* Descripción Texto */}
                <div className="mt-8">
                   <h3 className="font-bold text-gray-900 mb-2">Descripción</h3>
                   <p className="text-gray-600 leading-relaxed text-sm">
                     {product.description || 'Sin descripción disponible.'}
                   </p>
                </div>

              </div>
            </div>
          </div>

          <RecommendedProducts currentProductSlug={product.slug} cart={cart} setCart={setCart} />
        </div>
      </div>
    </PageTransition>
  );
};

export default ProductDetail;