import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Phone, User, Mail, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { orderService } from '../lib/supabase';
import toast from 'react-hot-toast';

const Checkout = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Calcular totales
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // Como quitaste la dirección, asumo que el envío se coordina después, 
  // así que podemos ponerlo en 0 o dejarlo fijo si prefieres.
  const shippingCost = 0; 
  const total = subtotal + shippingCost;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (cart.length === 0) {
      toast.error("Tu carrito está vacío");
      navigate('/tienda');
      return;
    }

    try {
      // Preparamos los datos para Supabase
      const orderData = {
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.email,
        customer_phone: formData.phone,
        // Como quitamos el formulario de dirección, mandamos esto por defecto
        shipping_address: "A coordinar por WhatsApp", 
        products: cart, 
        subtotal: subtotal,
        shipping_cost: shippingCost,
        total: total,
        status: 'pending'
        // ELIMINAMOS 'payment_method' PARA ARREGLAR EL ERROR DE BASE DE DATOS
      };

      const newOrder = await orderService.create(orderData);

      if (newOrder) {
        toast.success("¡Orden creada con éxito!");
        setCart([]); // Vaciar carrito
        navigate(`/order-success/${newOrder.id}`);
      }

    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al procesar tu pedido.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-400">
            <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <button onClick={() => navigate('/tienda')} className="bg-black text-white px-6 py-2 rounded-full font-medium">
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* COLUMNA IZQUIERDA: Formulario Simplificado */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
              <User className="w-6 h-6" /> Tus Datos
            </h2>
            
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre</label>
                  <input 
                    required 
                    type="text"
                    name="firstName" 
                    placeholder="Ej: Maria"
                    onChange={handleChange} 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Apellido</label>
                  <input 
                    required 
                    type="text"
                    name="lastName" 
                    placeholder="Ej: Perez"
                    onChange={handleChange} 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 outline-none transition-all" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Teléfono (WhatsApp)</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <input 
                    required 
                    type="tel" 
                    name="phone" 
                    placeholder="Ej: 351 123 4567"
                    onChange={handleChange} 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 outline-none transition-all" 
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-1">Para coordinar el pago y envío.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <input 
                    required 
                    type="email" 
                    name="email" 
                    placeholder="Ej: hola@email.com"
                    onChange={handleChange} 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 outline-none transition-all" 
                  />
                </div>
              </div>
            </form>
          </div>
        </motion.div>

        {/* COLUMNA DERECHA: Resumen de Orden */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-gray-100 sticky top-24">
            <h3 className="text-xl font-bold mb-6">Resumen del Pedido</h3>
            
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 mb-6 custom-scrollbar">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 items-center">
                  <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                    <img src={item.images?.[0] || item.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.size} {item.color ? `/ ${item.color}` : ''}</p>
                  </div>
                  <p className="text-sm font-semibold">x{item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              
              {/* Puedes ocultar esto si el envío siempre es a coordinar */}
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span className="text-sm font-medium bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                  A coordinar
                </span>
              </div>

              <div className="flex justify-between text-xl font-bold text-black pt-4 border-t border-gray-100 mt-2">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>

            <button 
              type="submit" 
              form="checkout-form"
              disabled={loading}
              className="w-full mt-8 bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
            >
              {loading ? 'Procesando...' : 'Confirmar Pedido'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
            
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400 text-center">
              <ShieldCheck className="w-4 h-4" />
              Tus datos están protegidos.
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Checkout;