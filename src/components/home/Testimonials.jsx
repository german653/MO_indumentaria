import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

// Recibe 'testimonials' como prop desde Home
const Testimonials = ({ testimonials = [] }) => {
  
  // Si no hay testimonios, no mostramos la sección (o mostramos placeholder)
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif mb-4">
            Lo que dicen nuestras <span className="italic text-mo-pink-600">clientas</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Miles de mujeres ya confiaron en MO para sus entrenamientos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 p-8 rounded-3xl relative"
            >
              <Quote className="w-10 h-10 text-mo-pink-200 mb-6" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                "{testimonial.comment}"
              </p>

              <div className="flex items-center gap-4">
                {testimonial.image ? (
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-mo-pink-100 flex items-center justify-center text-mo-pink-600 font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">Clienta Verificada</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;