import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import ImageGallery from '../components/product/ImageGallery';
import ProductInfo from '../components/product/ProductInfo';
import RelatedProducts from '../components/product/RelatedProducts';
import { products } from '../data/products';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { fadeInUp } from '../utils/animations';

const ProductDetail = ({ cart, setCart }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = products.find(p => p.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors?.[0] || '');
    } else {
      navigate('/tienda');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona un talle');
      return;
    }

    setCart(prev => {
      const existing = prev.find(
        item => item.id === product.id && item.size === selectedSize && item.color === selectedColor
      );

      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.size === selectedSize && item.color === selectedColor
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { ...product, size: selectedSize, color: selectedColor, quantity }];
    });

    // Show success message (you can replace with a toast notification)
    alert('¡Producto agregado al carrito!');
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-20 px-6">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-sm mb-8"
          >
            <Link to="/" className="text-gray-500 hover:text-black transition">
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/tienda" className="text-gray-500 hover:text-black transition">
              Tienda
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-black font-medium">{product.name}</span>
          </motion.div>

          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ x: -5 }}
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 mb-8 text-gray-600 hover:text-black transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </motion.button>

          {/* Product Content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
            {/* Image Gallery */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <ImageGallery images={product.images} productName={product.name} />
            </motion.div>

            {/* Product Info */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <ProductInfo
                product={product}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                quantity={quantity}
                setQuantity={setQuantity}
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <RelatedProducts products={relatedProducts} cart={cart} setCart={setCart} />
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default ProductDetail;