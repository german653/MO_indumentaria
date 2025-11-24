import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import { Heart, Target, Award, Users, Sparkles } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/animations';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Pasión',
      description: 'Creamos cada pieza con amor y dedicación, pensando en cada detalle para que te sientas increíble.'
    },
    {
      icon: Award,
      title: 'Calidad Premium',
      description: 'Utilizamos únicamente los mejores materiales y procesos de fabricación para garantizar durabilidad.'
    },
    {
      icon: Target,
      title: 'Innovación',
      description: 'Siempre buscamos nuevas formas de mejorar nuestros diseños y adaptarnos a tus necesidades.'
    },
    {
      icon: Users,
      title: 'Comunidad',
      description: 'No solo vendemos ropa, construimos una comunidad de mujeres fuertes y empoderadas.'
    }
  ];

  const timeline = [
    { year: '2020', event: 'Fundación de MO Indumentaria', description: 'Comenzamos con un sueño y 10 diseños exclusivos' },
    { year: '2021', event: 'Primera colección completa', description: 'Lanzamos 50 productos y llegamos a 1000 clientas' },
    { year: '2022', event: 'Expansión nacional', description: 'Enviamos a todo Argentina y abrimos nuestro showroom' },
    { year: '2023', event: 'Reconocimiento de marca', description: 'Premiados como mejor marca emergente de activewear' },
    { year: '2024', event: 'Nueva era', description: 'Más de 10.000 clientas felices y colaboraciones internacionales' }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-mo-pink-100 via-white to-mo-pink-50 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-mo-pink-300 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-mo-pink-400 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          </div>

          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-black/5 backdrop-blur-sm rounded-full mb-8"
              >
                <Sparkles className="w-5 h-5 text-mo-pink-600" />
                <span className="font-medium">Nuestra Historia</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6">
                Sobre <span className="italic text-mo-pink-600">Nosotros</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                Somos más que una marca de ropa deportiva. Somos un movimiento que inspira a mujeres a sentirse <span className="font-semibold text-black">poderosas, elegantes y auténticas</span> en cada momento.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-4xl md:text-5xl font-serif">Nuestra Misión</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  En MO Indumentaria, creemos que la ropa deportiva debe ser tan hermosa como funcional. Cada diseño nace de la idea de que toda mujer merece sentirse increíble mientras persigue sus metas.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Combinamos materiales de primera calidad con diseños contemporáneos para crear piezas que te acompañen desde el gimnasio hasta tu vida cotidiana, sin comprometer estilo ni comodidad.
                </p>
                <div className="pt-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-1 bg-mo-pink-600 rounded-full" />
                    <span className="font-semibold">Diseño Argentino</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-1 bg-mo-pink-600 rounded-full" />
                    <span className="font-semibold">Calidad Internacional</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80"
                    alt="Nuestra misión"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-mo-pink-300 rounded-full blur-2xl opacity-60" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-4">
                Nuestros Valores
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Los pilares que guían cada decisión que tomamos
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="text-center p-8 rounded-2xl bg-gradient-to-br from-mo-pink-50 to-white hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-mo-pink-400 to-mo-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:rotate-6 transition-transform">
                    <value.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-4">
                Nuestro Recorrido
              </h2>
              <p className="text-xl text-gray-600">
                Cada paso ha sido importante en esta historia
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex gap-8 mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="inline-block px-6 py-2 bg-mo-pink-100 rounded-full mb-4">
                      <span className="font-bold text-mo-pink-600">{item.year}</span>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">{item.event}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  <div className="w-4 h-4 bg-mo-pink-600 rounded-full mt-2" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-mo-pink-400 to-mo-pink-600">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="container mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Únete a Nuestra Comunidad
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Más de 10.000 mujeres ya confían en MO para sus entrenamientos
            </p>
            <button className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform shadow-xl">
              Ver Colección
            </button>
          </motion.div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;