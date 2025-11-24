import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import BrandStory from '../components/home/BrandStory';
import { Truck, ShieldCheck, CreditCard, RotateCcw, ArrowRight, MessageCircle } from 'lucide-react';

const Home = ({ cart, setCart }) => {
  // Datos de los beneficios
  const features = [
    {
      icon: Truck,
      title: 'Envío Gratis',
      description: 'En compras +$60.000',
    },
    {
      icon: CreditCard,
      title: '3 y 6 Cuotas',
      description: 'Sin interés con tarjetas',
    },
    {
      icon: ShieldCheck,
      title: 'Compra Segura',
      description: 'Tus datos protegidos',
    },
    {
      icon: RotateCcw,
      title: 'Cambio Gratis',
      description: 'Primer cambio sin cargo',
    }
  ];

  return (
    <PageTransition>
      <div className="overflow-hidden bg-white">
        
        {/* 1. HERO SECTION (Portada) */}
        <Hero />

        {/* 2. FEATURES SECTION (Beneficios) */}
        <section className="py-10 border-b border-gray-100">
          <div className="container mx-auto px-6">
            
            {/* INDICADOR DE DESLIZAR (Solo Móvil) */}
            <div className="flex justify-end md:hidden mb-2">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-1 text-xs font-bold text-mo-pink-600 uppercase tracking-wide"
              >
                <span>Desliza</span>
                <ArrowRight className="w-3 h-3" />
              </motion.div>
            </div>

            {/* Carrusel */}
            <div className="
              flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 
              md:grid md:grid-cols-4 md:gap-8 md:pb-0 md:mx-0 md:px-0
              scrollbar-hide
            ">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="
                    flex-none w-[80%] snap-center
                    bg-gray-50 rounded-2xl p-6 
                    md:w-auto md:bg-transparent md:p-0 md:text-center md:hover:translate-y-[-5px] md:transition-transform
                    flex items-center md:flex-col gap-4 border border-gray-100 md:border-none
                  "
                >
                  <div className="w-12 h-12 bg-white md:bg-mo-pink-50 rounded-full flex items-center justify-center text-mo-pink-600 shadow-sm md:shadow-none mb-0 md:mb-3 flex-shrink-0">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  
                  <div className="text-left md:text-center">
                    <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-tight">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. PRODUCTOS DESTACADOS */}
        <FeaturedProducts cart={cart} setCart={setCart} />

        {/* 4. HISTORIA DE MARCA */}
        <BrandStory />
        
        {/* 5. SECCIÓN WHATSAPP (Reemplaza al Newsletter) */}
        <section className="py-20 bg-black text-white text-center px-6">
          <div className="container mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <MessageCircle className="w-16 h-16 mx-auto mb-6 text-mo-pink-600" />
              
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                ¿Tenés dudas con tu talle?
              </h2>
              
              <p className="text-gray-400 mb-8 text-lg">
                Escribinos por WhatsApp. Te ayudamos a elegir el modelo perfecto para vos y coordinamos el envío.
              </p>

              <a 
                href="https://wa.me/5491100000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-mo-pink-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-mo-pink-600/30"
              >
                Chatear con nosotros
                <MessageCircle className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default Home;