import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, MapPin, Mail, Phone, Heart, CreditCard, MessageCircle, X, Ruler } from 'lucide-react';

const Footer = () => {
  // Estado para controlar si se muestra la guía de talles
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // EFECTO PARA BLOQUEAR EL SCROLL
  useEffect(() => {
    if (showSizeGuide) {
      // Si el modal está abierto, bloqueamos el scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Si se cierra, lo reactivamos
      document.body.style.overflow = 'unset';
    }
    
    // Limpieza al desmontar el componente (por seguridad)
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSizeGuide]);

  return (
    <>
      <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-900">
        <div className="container mx-auto px-6">
          
          {/* SECCIÓN SUPERIOR: Grid de 4 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* 1. MARCA Y REDES */}
            <div className="col-span-1 md:col-span-1 space-y-6">
              <Link to="/" className="block">
                <span className="text-3xl font-serif font-bold tracking-tight text-white">
                  MO <span className="text-mo-pink-600">Indumentaria</span>
                </span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Diseñamos ropa deportiva fusionando tecnología, comodidad y las últimas tendencias. Industria Argentina.
              </p>
              
              {/* REDES SOCIALES */}
              <div className="flex gap-4">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-mo-pink-600 hover:text-white transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://wa.me/549..." 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* 2. EXPLORAR */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Explorar</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li>
                  <Link to="/tienda" className="hover:text-mo-pink-600 transition-colors inline-block transform hover:translate-x-1 duration-200">
                    Ver Tienda
                  </Link>
                </li>
                <li>
                  <Link to="/nosotros" className="hover:text-mo-pink-600 transition-colors inline-block transform hover:translate-x-1 duration-200">
                    Sobre Nosotros
                  </Link>
                </li>
              </ul>
            </div>

            {/* 3. AYUDA */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Ayuda</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li>
                  <Link to="/contacto" className="hover:text-mo-pink-600 transition-colors inline-block transform hover:translate-x-1 duration-200">
                    Contacto
                  </Link>
                </li>
                <li>
                  {/* Botón que abre el Modal */}
                  <button 
                    onClick={() => setShowSizeGuide(true)}
                    className="hover:text-mo-pink-600 transition-colors text-left inline-block transform hover:translate-x-1 duration-200"
                  >
                    Guía de Talles
                  </button>
                </li>
              </ul>
            </div>

            {/* 4. CONTACTO */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Contacto</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-start gap-3 group">
                  <MapPin className="w-5 h-5 text-mo-pink-600 shrink-0 group-hover:text-white transition-colors" />
                  <span>Villa Carlos Paz, Córdoba,<br/>Argentina.</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <Mail className="w-5 h-5 text-mo-pink-600 shrink-0 group-hover:text-white transition-colors" />
                  <span>hola@moindumentaria.com</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <Phone className="w-5 h-5 text-mo-pink-600 shrink-0 group-hover:text-white transition-colors" />
                  <span>+54 9 3541 00-0000</span>
                </li>
              </ul>
            </div>

          </div>

          {/* SECCIÓN INFERIOR */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              © 2024 MO Indumentaria. Hecho con <Heart className="w-3 h-3 text-red-500 fill-current" /> en Córdoba.
            </p>

            {/* Iconos de Pago */}
            <div className="flex items-center gap-3 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="bg-white/10 px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
                <CreditCard className="w-3 h-3" /> VISA
              </div>
              <div className="bg-white/10 px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
                <CreditCard className="w-3 h-3" /> MASTER
              </div>
              <div className="bg-white/10 px-2 py-1 rounded text-xs font-bold text-white">
                MERCADO PAGO
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL DE GUÍA DE TALLES */}
      <AnimatePresence>
        {showSizeGuide && (
          <>
            {/* FONDO OSCURO (Backdrop)
                z-[200]: Para estar por encima de todo (Navbar es 110, Carrito es 150)
            */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSizeGuide(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            />
            
            {/* VENTANA MODAL (Centrada) 
                top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2: Centrado perfecto
                z-[210]: Encima del fondo oscuro
            */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 w-[90%] max-w-lg bg-white rounded-2xl shadow-2xl z-[210] overflow-hidden"
            >
              {/* Cabecera del Modal */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-mo-pink-100 rounded-full flex items-center justify-center text-mo-pink-600">
                    <Ruler className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold font-serif text-black">Guía de Talles</h3>
                </div>
                <button 
                  onClick={() => setShowSizeGuide(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contenido (Tabla) */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <p className="text-gray-600 mb-6 text-sm text-center">
                  Usa esta tabla como referencia. Las medidas están expresadas en centímetros.
                </p>
                
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3">Talle</th>
                        <th className="px-4 py-3">Busto</th>
                        <th className="px-4 py-3">Cintura</th>
                        <th className="px-4 py-3">Cadera</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-bold text-black">S</td>
                        <td className="px-4 py-3">85 - 90</td>
                        <td className="px-4 py-3">60 - 65</td>
                        <td className="px-4 py-3">90 - 95</td>
                      </tr>
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-bold text-black">M</td>
                        <td className="px-4 py-3">90 - 95</td>
                        <td className="px-4 py-3">65 - 70</td>
                        <td className="px-4 py-3">95 - 100</td>
                      </tr>
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-bold text-black">L</td>
                        <td className="px-4 py-3">95 - 100</td>
                        <td className="px-4 py-3">70 - 75</td>
                        <td className="px-4 py-3">100 - 105</td>
                      </tr>
                      <tr className="bg-white hover:bg-gray-50">
                        <td className="px-4 py-3 font-bold text-black">XL</td>
                        <td className="px-4 py-3">100 - 105</td>
                        <td className="px-4 py-3">75 - 80</td>
                        <td className="px-4 py-3">105 - 110</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 text-center">
                  <button 
                    onClick={() => setShowSizeGuide(false)}
                    className="w-full py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-colors"
                  >
                    Entendido
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;