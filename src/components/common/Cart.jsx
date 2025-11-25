import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 60000 ? 0 : 5000;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP (Fondo oscuro) - z-[140] */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[140]"
          />

          {/* PANEL DEL CARRITO - z-[150] */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[150] flex flex-col"
          >
            {/* Header del Carrito */}
            <div className="p-6 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-black" />
                <h2 className="text-xl font-serif font-bold">Tu Carrito</h2>
                <span className="bg-mo-pink-100 text-mo-pink-600 text-xs font-bold px-2 py-1 rounded-full">
                  {items.length} items
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Lista de Productos */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                // --- ESTADO VACÍO ---
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-gray-300" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">El carrito está vacío</p>
                    <p className="text-sm text-gray-500">¡Agrega algunos looks increíbles!</p>
                  </div>
                  
                  {/* BOTÓN CORREGIDO: Ahora lleva a /tienda */}
                  <Link 
                    to="/tienda" 
                    onClick={onClose} // Cierra el carrito al hacer clic
                    className="mt-4 px-8 py-3 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
                  >
                    Ver Productos
                  </Link>
                </div>
              ) : (
                // --- LISTA DE PRODUCTOS ---
                items.map((item) => (
                  <motion.div 
                    layout
                    key={`${item.id}-${item.size}`}
                    className="flex gap-4"
                  >
                    {/* Imagen del producto */}
                    <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-900 line-clamp-1 pr-4">{item.name}</h3>
                          <button 
                            onClick={() => onRemove(item.id, item.size)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Talle: {item.size}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-200 rounded-full">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.size, -1)}
                            className="p-1.5 hover:bg-gray-50 rounded-l-full text-gray-600"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.size, 1)}
                            className="p-1.5 hover:bg-gray-50 rounded-r-full text-gray-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-bold text-black">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer del Carrito (Resumen) */}
            {items.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span>{shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString()}`}</span>
                  </div>
                  {/* Barra de progreso para envío gratis */}
                  {shipping > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-mo-pink-600 mb-1 text-center font-medium">
                        ¡Faltan ${(60000 - subtotal).toLocaleString()} para envío gratis!
                      </p>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-mo-pink-500 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((subtotal / 60000) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold text-black pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>

                <Link to="/carrito" onClick={onClose}>
                  <button className="w-full py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2">
                    Iniciar Compra
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;