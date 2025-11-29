import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';

const CartPage = ({ cart, setCart }) => {
  const updateQuantity = (id, size, color, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.size === size && item.color === color
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id, size, color) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size && item.color === color)));
  };

  // Solo calculamos el total de productos. El envío se coordina aparte.
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal; 

  if (cart.length === 0) {
    return (
      <PageTransition>
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6 text-gray-400">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
          <Link
            to="/tienda"
            className="mt-6 px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all shadow-lg"
          >
            Ir a la Tienda
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8">
            Tu Carrito <span className="text-lg font-sans font-normal text-gray-500 ml-2">({cart.length} items)</span>
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Lista de Productos */}
            <div className="flex-1 space-y-4">
              {cart.map((item) => (
                <motion.div
                  key={`${item.id}-${item.size}-${item.color}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 sm:gap-6"
                >
                  {/* --- IMAGEN DEL PRODUCTO --- */}
                  <div className="w-24 h-32 sm:w-32 sm:h-40 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                    <img 
                      src={item.images?.[0] || item.image} // Toma la primera imagen del array
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-serif font-bold text-lg text-gray-900 line-clamp-2">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.id, item.size, item.color)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">
                        Talle: <span className="text-black font-medium uppercase">{item.size}</span>
                        {item.color && <span className="ml-3">Color: {item.color}</span>}
                      </p>
                      <p className="text-lg font-bold text-black mt-2">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                      <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, -1)}
                          className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors text-gray-600"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, 1)}
                          className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors text-gray-600"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Resumen de Compra */}
            <div className="lg:w-96 shrink-0">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24"
              >
                <h3 className="text-xl font-bold mb-6">Resumen</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span className="text-sm font-medium bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                      A coordinar
                    </span>
                  </div>

                  <div className="border-t border-gray-100 pt-3 mt-3">
                    <div className="flex justify-between text-xl font-bold text-black">
                      <span>Total</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Link to="/checkout" className="block w-full">
                  <button className="w-full py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all mb-4 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02]">
                    Finalizar Compra
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>

                <Link
                  to="/tienda"
                  className="block text-center text-sm text-gray-500 hover:text-black transition-colors font-medium"
                >
                  Continuar comprando
                </Link>

                {/* Badges de Confianza */}
                <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                    <span className="text-gray-600">Compra 100% segura</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-600">Transferencia / Efectivo</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CartPage;