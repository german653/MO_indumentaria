import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, Plus, Minus, Check, Ruler, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import RecommendedProducts from '../components/product/RecommendedProducts';
import { productService } from '../lib/supabase'; // Servicio real
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProductDetail = ({ cart, setCart }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Cargar producto desde Supabase
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // getBySlug debe estar definido en tu supabase.js
        const data = await productService.getBySlug(slug);
        
        if (data) {
          setProduct(data);
          // Seleccionar primer talle por defecto si existe
          if (data.sizes && data.sizes.length > 0) {
            setSelectedSize(data.sizes[0]);
          }
        } else {
          // Si no existe, redirigir o mostrar error (aquí lo manejamos en el render)
          setProduct(null);
        }
      } catch (error) {
        console.error("Error buscando producto:", error);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <LoadingSpinner fullScreen />;

  if (!product) {
    return (
      <PageTransition>
        <div className="container mx-auto px-6 py-40 text-center">
          <h2 className="text-3xl font-serif font-bold text-black mb-4">Producto no encontrado</h2>
          <p className="text-gray-500 mb-8">Es posible que haya sido eliminado o no exista.</p>
          <Link to="/tienda" className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-colors">
            Volver a la Tienda
          </Link>
        </div>
      </PageTransition>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      alert('Por favor, selecciona un talle.');
      return;
    }
    
    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0], // DB suele guardar array
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
          
          <button onClick={() => navigate(-1)} className="mb-8 inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" /> Volver atrás
          </button>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* GALERÍA */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="w-full lg:w-1/2 flex flex-col gap-4 sticky top-28 h-fit">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <img src={product.images?.[0]} alt={product.name} className="w-full h-full object-cover" />
              </div>
              {product.images?.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {product.images.map((img, index) => (
                    <img key={index} src={img} alt={`Vista ${index}`} className="w-24 h-24 object-cover rounded-xl border border-gray-100 cursor-pointer hover:border-mo-pink-600" />
                  ))}
                </div>
              )}
            </motion.div>

            {/* INFO */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-1/2">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm uppercase tracking-widest text-gray-500 font-medium">{product.category}</span>
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4 leading-tight">{product.name}</h1>

              <div className="flex items-baseline gap-3 mb-6">
                {product.old_price && (
                  <span className="text-xl text-gray-400 line-through">${product.old_price.toLocaleString()}</span>
                )}
                <span className="text-3xl font-bold text-black">${product.price.toLocaleString()}</span>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-8">{product.description}</p>

              {/* Talles */}
              {product.sizes?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-700 mb-4">Selecciona Talle</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-5 py-3 rounded-full border-2 text-sm font-medium transition-all ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-200 hover:border-black'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Botones */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                <div className="flex items-center border border-gray-300 rounded-full w-full sm:w-auto overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-100"><Minus className="w-4 h-4" /></button>
                  <span className="px-5 text-lg font-bold text-black">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-100"><Plus className="w-4 h-4" /></button>
                </div>
                <button onClick={handleAddToCart} className="flex-1 w-full sm:w-auto px-8 py-4 bg-mo-pink-600 text-white rounded-full font-bold text-lg hover:bg-black transition-colors shadow-lg flex items-center justify-center gap-2">
                  <ShoppingBag className="w-5 h-5" /> {addedToCart ? 'Agregado!' : 'Añadir al Carrito'}
                </button>
              </div>

              {/* Guía Talles Desplegable */}
              <div className="border-t border-gray-100 pt-8 mt-8">
                <div className="border border-gray-100 rounded-lg overflow-hidden">
                  <button onClick={() => setShowSizeGuide(!showSizeGuide)} className="flex justify-between items-center w-full p-5 text-left font-medium hover:bg-gray-50">
                    <div className="flex items-center gap-3"><Ruler className="w-5 h-5 text-mo-pink-600" /> Guía de Talles</div>
                    {showSizeGuide ? <ChevronUp /> : <ChevronDown />}
                  </button>
                  <AnimatePresence>
                    {showSizeGuide && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="bg-gray-50 px-5 pb-5 overflow-hidden">
                        <p className="text-sm text-gray-600">Consultá la tabla de medidas en el pie de página o escribinos.</p>
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