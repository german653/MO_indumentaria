import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import BrandStory from '../components/home/BrandStory';
import Testimonials from '../components/home/Testimonials';
import { Sparkles, Shield, Heart } from 'lucide-react'; // Quitamos Truck
import { fadeInUp, staggerContainer } from '../utils/animations';
import { productService, testimonialService } from '../lib/supabase';

const Home = ({ cart, setCart }) => {
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Cargamos productos y testimonios en paralelo
      const [productsData, testimonialsData] = await Promise.all([
        productService.getAll(true), // true = solo activos
        testimonialService.getAll()
      ]);

      // Filtramos o tomamos los primeros para destacar
      setFeaturedProducts(productsData.filter(p => p.featured));
      setTestimonials(testimonialsData);
    } catch (error) {
      console.error('Error al cargar datos del Home:', error);
    } finally {
      setLoading(false);
    }
  };

  // Características Actualizadas (Sin Envío Gratis)
  const features = [
    {
      icon: Sparkles,
      title: 'Diseño Exclusivo',
      description: 'Prendas únicas pensadas para destacar tu estilo.'
    },
    {
      icon: Shield,
      title: 'Compra Segura',
      description: 'Tus datos están protegidos en todo momento.'
    },
    {
      icon: Heart,
      title: 'Atención Personalizada',
      description: 'Estamos para asesorarte en lo que necesites.'
    }
  ];

  return (
    <PageTransition>
      <div className="bg-white">
        
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <section className="py-16 md:py-24 px-6 bg-white relative z-10 -mt-20 md:-mt-32">
          <div className="container mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="text-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-10 h-10 text-black" />
                  </div>
                  <h3 className="font-serif font-bold text-xl mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Products (Desde Supabase) */}
        <FeaturedProducts 
          cart={cart} 
          setCart={setCart}
          products={featuredProducts}
        />

        {/* Brand Story */}
        <BrandStory />

        {/* Testimonials (Desde Supabase) */}
        <Testimonials testimonials={testimonials} />

      </div>
    </PageTransition>
  );
};

export default Home;