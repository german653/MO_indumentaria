import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import BrandStory from '../components/home/BrandStory';
import Testimonials from '../components/home/Testimonials';
import { Sparkles, Truck, Shield, Heart } from 'lucide-react';
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
      const [productsData, testimonialsData] = await Promise.all([
        productService.getFeatured(),
        testimonialService.getAll()
      ]);

      setFeaturedProducts(productsData);
      setTestimonials(testimonialsData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Truck,
      title: 'Envío Gratis',
      description: 'En compras superiores a $25.000'
    },
    {
      icon: Shield,
      title: 'Compra Segura',
      description: 'Protección total en tus pagos'
    },
    {
      icon: Sparkles,
      title: 'Calidad Premium',
      description: 'Materiales de primera calidad'
    },
    {
      icon: Heart,
      title: 'Garantía 30 días',
      description: 'Devolución sin preguntas'
    }
  ];

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando...</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="overflow-hidden">
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <section className="py-20 px-6 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-10 left-10 w-72 h-72 bg-mo-pink-300 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-mo-pink-200 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto relative z-10">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="text-center p-8 rounded-2xl hover:bg-mo-pink-50 transition-all duration-300 group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="w-20 h-20 bg-gradient-to-br from-mo-pink-100 to-mo-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl transition-shadow"
                  >
                    <feature.icon className="w-10 h-10 text-mo-pink-600" />
                  </motion.div>
                  <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Products - Ahora con datos de Supabase */}
        <FeaturedProducts 
          cart={cart} 
          setCart={setCart}
          products={featuredProducts}
        />

        {/* Brand Story */}
        <BrandStory />

        {/* Testimonials - Ahora con datos de Supabase */}
        <Testimonials testimonials={testimonials} />

      </div>
    </PageTransition>
  );
};

export default Home;