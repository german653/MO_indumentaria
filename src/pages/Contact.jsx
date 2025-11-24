import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import { Mail, Phone, MapPin, Instagram, Facebook, Send, Clock } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Gracias por contactarnos! Te responderemos pronto.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'info@mo-indumentaria.com',
      link: 'mailto:info@mo-indumentaria.com'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      content: '+54 (123) 456-7890',
      link: 'tel:+541234567890'
    },
    {
      icon: MapPin,
      title: 'Dirección',
      content: 'Villa Carlos Paz, Córdoba, Argentina',
      link: null
    },
    {
      icon: Clock,
      title: 'Horario',
      content: 'Lun - Vie: 9:00 - 18:00',
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: 'Instagram',
      handle: '@indumentaria_melioviedo',
      link: 'https://instagram.com/indumentaria_melioviedo',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Facebook,
      name: 'Facebook',
      handle: 'MO Indumentaria',
      link: 'https://facebook.com',
      color: 'from-blue-500 to-blue-600'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-mo-pink-100 via-white to-mo-pink-50 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-mo-pink-300 rounded-full blur-3xl animate-float" />
          </div>

          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6">
                ¡Hablemos <span className="italic text-mo-pink-600">Hoy!</span>
              </h1>
              <p className="text-xl text-gray-600">
                Estamos aquí para responder todas tus preguntas y ayudarte en lo que necesites
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-20 px-6 -mt-10 relative z-10">
          <div className="container mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  variants={fadeInUp}
                  href={info.link || '#'}
                  className={`group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${info.link ? 'cursor-pointer' : 'cursor-default'}`}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-mo-pink-100 to-mo-pink-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <info.icon className="w-8 h-8 text-mo-pink-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                  <p className="text-gray-600">{info.content}</p>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Social */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-serif mb-6">Envíanos un Mensaje</h2>
                <p className="text-gray-600 mb-8">
                  Completa el formulario y nos pondremos en contacto contigo lo antes posible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-mo-pink-400 focus:bg-white transition-all outline-none"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-mo-pink-400 focus:bg-white transition-all outline-none"
                        placeholder="tu@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Teléfono</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-mo-pink-400 focus:bg-white transition-all outline-none"
                        placeholder="+54 123 456 7890"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Asunto</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-mo-pink-400 focus:bg-white transition-all outline-none"
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Mensaje</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-mo-pink-400 focus:bg-white transition-all outline-none resize-none"
                      placeholder="Cuéntanos más detalles..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all inline-flex items-center justify-center gap-2 shadow-xl"
                  >
                    Enviar Mensaje
                    <Send className="w-5 h-5" />
                  </motion.button>
                </form>
              </motion.div>

              {/* Social Media & Additional Info */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-4xl font-serif mb-6">Síguenos</h2>
                  <p className="text-gray-600 mb-8">
                    Mantente al día con nuestras últimas colecciones, promociones exclusivas y consejos de estilo.
                  </p>

                  <div className="space-y-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all group"
                      >
                        <div className={`w-14 h-14 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <social.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{social.name}</h3>
                          <p className="text-gray-600">{social.handle}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* FAQ Preview */}
                <div className="p-8 bg-gradient-to-br from-mo-pink-50 to-mo-pink-100 rounded-2xl">
                  <h3 className="text-2xl font-semibold mb-4">¿Tienes dudas?</h3>
                  <p className="text-gray-700 mb-6">
                    Consulta nuestras preguntas frecuentes o contáctanos directamente.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-mo-pink-600 rounded-full mt-2" />
                      <p className="text-gray-700">Envíos a todo el país</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-mo-pink-600 rounded-full mt-2" />
                      <p className="text-gray-700">30 días para devoluciones</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-mo-pink-600 rounded-full mt-2" />
                      <p className="text-gray-700">Atención personalizada</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section (Optional) */}
        <section className="py-20 px-6 bg-gray-100">
          <div className="container mx-auto">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl font-serif mb-6">Encuéntranos</h2>
              <p className="text-gray-600 mb-8">Villa Carlos Paz, Córdoba, Argentina</p>
              <div className="aspect-video bg-white rounded-2xl shadow-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27274.11954716684!2d-64.49847885!3d-31.42079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d6640d6777c85%3A0x5a6f3b5b5b5b5b5b!2sVilla%20Carlos%20Paz%2C%20C%C3%B3rdoba!5e0!3m2!1ses!2sar!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Contact;