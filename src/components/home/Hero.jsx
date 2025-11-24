import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  // Animaciones simples para el texto
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-mo-pink-50 overflow-hidden pt-20 md:pt-0">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* 1. TEXTO (Lado Izquierdo) */}
          <div className="flex-1 text-center md:text-left z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6 border border-mo-pink-100">
                <Sparkles className="w-4 h-4 text-mo-pink-600" />
                <span className="text-sm font-medium text-gray-600">Nueva Colección 2024</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6 text-black">
                Tu estilo, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-mo-pink-600 to-purple-600 italic">
                  tu movimiento.
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                Diseños exclusivos pensados para acompañarte en cada entrenamiento con la máxima comodidad y estilo.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <Link to="/tienda" className="w-full sm:w-auto">
                  <button className="w-full px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
                    Ver Colección
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link to="/nosotros" className="w-full sm:w-auto">
                  <button className="w-full px-8 py-4 bg-white text-black border-2 border-gray-200 rounded-full font-semibold hover:border-black transition-all">
                    Conocenos
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* 2. IMAGEN (Lado Derecho) */}
          <div className="flex-1 relative w-full max-w-lg md:max-w-xl mx-auto md:mx-0">
            {/* Círculo decorativo detrás */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white rounded-full blur-3xl opacity-60 -z-10"
            />
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white"
            >
              {/* IMAGEN PRINCIPAL: Puedes cambiar este link por una foto tuya en /assets */}
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" 
                alt="MO Indumentaria Modelo" 
                className="w-full h-[600px] object-cover"
              />
              
              {/* Tarjeta flotante pequeña */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Destacado</p>
                    <p className="font-serif font-bold text-lg">Conjunto Active</p>
                  </div>
                  <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                    $15.200
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;