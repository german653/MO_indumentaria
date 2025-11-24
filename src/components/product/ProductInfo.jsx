import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Share2, ShoppingBag, Truck, Shield, RotateCcw, Award, Plus, Minus } from 'lucide-react';
import { fadeInUp } from '../../utils/animations';

const ProductInfo = ({
  product,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity,
  onAddToCart
}) => {
  const benefits = [
    { icon: Truck, text: 'Envío gratis en compras +$25.000' },
    { icon: Shield, text: 'Compra 100% segura' },
    { icon: RotateCcw, text: '30 días para cambios' },
    { icon: Award, text: 'Garantía de calidad' }
  ];

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Category & Rating */}
      <div className="flex items-center justify-between">
        <span className="px-4 py-2 bg-mo-pink-100 text-mo-pink-600 rounded-full text-sm font-semibold">
          {product.category}
        </span>
        
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Heart className="w-6 h-6" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-4xl md:text-5xl font-serif mb-4">{product.name}</h1>
        
        {product.rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < product.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">
              ({product.reviews} reseñas)
            </span>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-4">
        <p className="text-5xl font-light">${product.price.toLocaleString()}</p>
        {product.oldPrice && (
          <p className="text-2xl text-gray-400 line-through">
            ${product.oldPrice.toLocaleString()}
          </p>
        )}
      </div>

      {/* Description */}
      <p className="text-lg text-gray-600 leading-relaxed">
        {product.description}
      </p>

      {/* Features */}
      {product.features && (
        <div className="bg-mo-pink-50 rounded-2xl p-6">
          <h3 className="font-semibold text-lg mb-4">Características</h3>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-mo-pink-600 rounded-full" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <label className="block text-lg font-semibold mb-3">
            Color: <span className="text-mo-pink-600">{selectedColor}</span>
          </label>
          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-6 py-3 border-2 rounded-xl font-medium transition-all ${
                  selectedColor === color
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 hover:border-black'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-lg font-semibold">
            Talle: {selectedSize && <span className="text-mo-pink-600">{selectedSize}</span>}
          </label>
          <button className="text-sm text-gray-600 hover:text-black underline">
            Guía de talles
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-6 py-3 border-2 rounded-xl font-semibold transition-all ${
                selectedSize === size
                  ? 'border-black bg-black text-white'
                  : 'border-gray-200 hover:border-black'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label className="block text-lg font-semibold mb-3">Cantidad</label>
        <div className="inline-flex items-center gap-4 bg-gray-100 rounded-xl px-6 py-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <Minus className="w-5 h-5" />
          </button>
          <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={onAddToCart}
        disabled={!selectedSize}
        className={`w-full py-5 rounded-xl font-semibold text-lg transition-all inline-flex items-center justify-center gap-3 ${
          selectedSize
            ? 'bg-black text-white hover:bg-gray-800 shadow-xl hover:shadow-2xl hover:scale-105'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <ShoppingBag className="w-6 h-6" />
        {selectedSize ? 'Agregar al Carrito' : 'Selecciona un talle'}
      </button>

      {/* Benefits */}
      <div className="grid grid-cols-2 gap-4 pt-6 border-t">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-mo-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
              <benefit.icon className="w-5 h-5 text-mo-pink-600" />
            </div>
            <p className="text-sm text-gray-600">{benefit.text}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProductInfo;