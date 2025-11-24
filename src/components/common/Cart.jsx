import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 25000 ? 0 : 3000;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-serif">Tu Carrito</h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-mo-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-12 h-12 text-mo-pink-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Tu carrito está vacío</h3>
                  <p className="text-gray-600 mb-6">
                    Agrega productos para comenzar tu compra
                  </p>
                  <Link to="/tienda" onClick={onClose}>
                    <button className="px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors">
                      Explorar Productos
                    </button>
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <AnimatePresence>
                    {items.map((item, index) => (
                      <motion.div
                        key={`${item.id}-${item.size}-${item.color || ''}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex gap-4 pb-6 border-b last:border-0"
                      >
                        {/* Image */}
                        <Link to={`/producto/${item.slug}`} onClick={onClose} className="flex-shrink-0">
                          <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
                            <img
                              src={item.images?.[0] || item.image}
                              alt={item.name}
                              className="w-full h-full object-cover hover:scale-110 transition-transform"
                            />
                          </div>
                        </Link>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between mb-2">
                            <Link to={`/producto/${item.slug}`} onClick={onClose}>
                              <h3 className="font-semibold hover:text-mo-pink-600 transition-colors line-clamp-2">
                                {item.name}
                              </h3>
                            </Link>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => onRemove(item.id, item.size, item.color)}
                              className="p-1 hover:bg-red-50 rounded-lg transition-colors group flex-shrink-0"
                            >
                              <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                            </motion.button>
                          </div>

                          <div className="text-sm text-gray-600 mb-3 space-y-1">
                            <p>Talle: <span className="font-medium text-black">{item.size}</span></p>
                            {item.color && (
                              <p>Color: <span className="font-medium text-black">{item.color}</span></p>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1.5">
                              <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.8 }}
                                onClick={() => onUpdateQuantity(item.id, item.size, item.color || '', -1)}
                                className="p-1 hover:bg-white rounded-full transition-all"
                              >
                                <Minus className="w-4 h-4" />
                              </motion.button>
                              <span className="w-8 text-center font-semibold">{item.quantity}</span>
                              <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.8 }}
                                onClick={() => onUpdateQuantity(item.id, item.size, item.color || '', 1)}
                                className="p-1 hover:bg-white rounded-full transition-all"
                              >
                                <Plus className="w-4 h-4" />
                              </motion.button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <p className="text-lg font-semibold">
                                ${(item.price * item.quantity).toLocaleString()}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-xs text-gray-500">
                                  ${item.price.toLocaleString()} c/u
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="border-t p-6 space-y-4 bg-gray-50">
                {/* Subtotal */}
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toLocaleString()}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">¡GRATIS!</span>
                    ) : (
                      `$${shipping.toLocaleString()}`
                    )}
                  </span>
                </div>

                {/* Free shipping progress */}
                {subtotal < 25000 && (
                  <div className="p-4 bg-mo-pink-50 rounded-xl">
                    <p className="text-sm text-gray-700 mb-2">
                      Agrega <span className="font-semibold">${(25000 - subtotal).toLocaleString()}</span> más para envío gratis 🚚
                    </p>
                    <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(subtotal / 25000) * 100}%` }}
                        className="h-full bg-gradient-to-r from-mo-pink-400 to-mo-pink-600"
                      />
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-2xl font-semibold mb-6">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>

                  <Link to="/carrito" onClick={onClose}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all mb-3 flex items-center justify-center gap-2 shadow-lg"
                    >
                      Ir al Carrito
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>

                  <button
                    onClick={onClose}
                    className="w-full py-3 text-center text-gray-600 hover:text-black transition-colors font-medium"
                  >
                    Continuar Comprando
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;