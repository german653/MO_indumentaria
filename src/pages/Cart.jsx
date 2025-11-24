import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/animations';

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

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 25000 ? 0 : 3000;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <div className="w-32 h-32 bg-mo-pink-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-16 h-16 text-mo-pink-400" />
            </div>
            <h1 className="text-4xl font-serif mb-4">Tu carrito está vacío</h1>
            <p className="text-gray-600 mb-8">
              ¡Descubre nuestra colección y encuentra tus piezas favoritas!
            </p>
            <Link
              to="/tienda"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all"
            >
              Ir a la Tienda
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-20 px-6">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-serif mb-4">
              Tu <span className="italic text-mo-pink-600">Carrito</span>
            </h1>
            <p className="text-xl text-gray-600">
              {cart.length} {cart.length === 1 ? 'producto' : 'productos'} en tu carrito
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {cart.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${item.size}-${item.color}`}
                    variants={fadeInUp}
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
                  >
                    <div className="flex gap-6">
                      {/* Image */}
                      <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.images?.[0] || item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between mb-2">
                          <Link
                            to={`/producto/${item.slug}`}
                            className="text-xl font-semibold hover:text-mo-pink-600 transition-colors"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id, item.size, item.color)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                          >
                            <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                          </button>
                        </div>

                        <div className="text-sm text-gray-600 mb-4 space-y-1">
                          <p>Talle: <span className="font-medium text-black">{item.size}</span></p>
                          {item.color && <p>Color: <span className="font-medium text-black">{item.color}</span></p>}
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-4 bg-gray-100 rounded-full px-4 py-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.color, -1)}
                              className="p-1 hover:bg-white rounded-full transition-all"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.color, 1)}
                              className="p-1 hover:bg-white rounded-full transition-all"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-2xl font-semibold">
                              ${(item.price * item.quantity).toLocaleString()}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-sm text-gray-500">
                                ${item.price.toLocaleString()} c/u
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-32"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-serif mb-6">Resumen del Pedido</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">${subtotal.toLocaleString()}</span>
                    </div>
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

                    {subtotal < 25000 && (
                      <div className="p-4 bg-mo-pink-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          Agrega <span className="font-semibold">${(25000 - subtotal).toLocaleString()}</span> más para envío gratis
                        </p>
                      </div>
                    )}

                    <div className="border-t pt-4">
                      <div className="flex justify-between text-2xl font-semibold">
                        <span>Total</span>
                        <span>${total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all mb-4 flex items-center justify-center gap-2">
                    Finalizar Compra
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <Link
                    to="/tienda"
                    className="block text-center text-gray-600 hover:text-black transition-colors"
                  >
                    Continuar comprando
                  </Link>

                  {/* Trust Badges */}
                  <div className="mt-8 pt-8 border-t space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Compra 100% segura</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Truck className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">Envíos a todo el país</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CreditCard className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700">Múltiples medios de pago</span>
                    </div>
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