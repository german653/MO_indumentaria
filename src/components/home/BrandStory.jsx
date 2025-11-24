import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react'; // Quitamos la importación de 'Heart'

const BrandStory = () => {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* 1. IMAGEN (Lado Izquierdo) - Sin el corazón */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full relative"
          >
            {/* Contenedor de imagen con sombra suave */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5] md:aspect-square">
              {/* IMAGEN: Puedes cambiar este link por una foto tuya, del local o del taller */}
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop" 
                alt="MO Indumentaria Taller" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/5"></div>
            </div>
          </motion.div>

          {/* 2. TEXTO (Lado Derecho) - Con botón estilo anterior */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 text-center md:text-left"
          >
            <span className="text-mo-pink-600 font-bold tracking-wider uppercase text-sm mb-4 block">
              Nuestra Esencia
            </span>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-6 leading-tight">
              Creando moda con <br/>
              <span className="italic text-gray-400">identidad propia.</span>
            </h2>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              En <strong>MO Indumentaria</strong> creemos que la ropa deportiva no tiene por qué ser aburrida. Nacimos con la misión de fusionar la funcionalidad técnica con las últimas tendencias.
            </p>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Cada prenda es pensada para que te sientas segura, cómoda y poderosa en cada movimiento. Apostamos a la calidad y al diseño que te acompaña todo el día.
            </p>

            {/* Botón estilo "pastilla" negra */}
            <Link to="/nosotros">
              <button className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all flex items-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-1 mx-auto md:mx-0">
                Conocer más sobre nosotros
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BrandStory;