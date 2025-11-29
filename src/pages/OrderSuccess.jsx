import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Copy, MessageCircle, ArrowRight, Home, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const OrderSuccess = () => {
  const { id } = useParams(); // Obtenemos el ID del pedido de la URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- TUS DATOS BANCARIOS (EDITAR AQUÍ) ---
  const BANK_DETAILS = {
    bank: "Tarjeta Naranja",
    alias: "mo-indumentaria",
    cbu: "0070000000000000000000",
    holder: "Analia Isabel Todeschi",
    whatsapp: "549354115639512" // Tu número con código de país (sin +)
  };
  // -----------------------------------------

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setOrder(data);
      } catch (error) {
        console.error('Error:', error);
        toast.error('No pudimos cargar los detalles del pedido');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('¡Copiado al portapapeles!');
  };

  const getWhatsAppLink = () => {
    if (!order) return "#";
    const message = `Hola MO! 👋 Acabo de realizar el pedido #${order.id.slice(0, 8)} por un total de $${order.total.toLocaleString()}. Te envío el comprobante de transferencia.`;
    return `https://wa.me/${BANK_DETAILS.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Pedido no encontrado</h2>
        <Link to="/" className="text-mo-pink-600 underline">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Encabezado Éxito */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
            ¡Gracias por tu compra!
          </h1>
          <p className="text-gray-500 text-lg">
            Tu pedido <span className="font-mono font-bold text-black">#{order.id.slice(0, 8)}</span> ha sido registrado.
          </p>
        </div>

        {/* Instrucciones de Pago */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 mb-6">
          <div className="bg-black text-white p-6 text-center">
            <h2 className="text-xl font-bold mb-1">Falta un pequeño paso...</h2>
            <p className="text-gray-300 text-sm">Realiza la transferencia para confirmar tu pedido</p>
            <div className="mt-4 text-3xl font-bold">
              ${order.total.toLocaleString()}
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Alias</p>
                  <p className="font-mono font-bold text-lg text-gray-900">{BANK_DETAILS.alias}</p>
                </div>
                <button 
                  onClick={() => copyToClipboard(BANK_DETAILS.alias)}
                  className="p-2 hover:bg-white rounded-lg transition-colors text-gray-500 hover:text-black shadow-sm"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">CBU / CVU</p>
                  <p className="font-mono font-bold text-lg text-gray-900 break-all">{BANK_DETAILS.cbu}</p>
                </div>
                <button 
                  onClick={() => copyToClipboard(BANK_DETAILS.cbu)}
                  className="p-2 hover:bg-white rounded-lg transition-colors text-gray-500 hover:text-black shadow-sm"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>

              <div className="px-4">
                <p className="text-sm text-gray-500">Banco: <span className="font-medium text-gray-900">{BANK_DETAILS.bank}</span></p>
                <p className="text-sm text-gray-500">Titular: <span className="font-medium text-gray-900">{BANK_DETAILS.holder}</span></p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <a 
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 mb-4"
              >
                <MessageCircle className="w-6 h-6" />
                Enviar Comprobante
              </a>
              <p className="text-xs text-center text-gray-400">
                Al hacer clic se abrirá WhatsApp con los datos de tu pedido ya escritos.
              </p>
            </div>
          </div>
        </div>

        {/* Botón volver */}
        <div className="text-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-black font-medium transition-colors"
          >
            <Home className="w-4 h-4" />
            Volver a la tienda
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;