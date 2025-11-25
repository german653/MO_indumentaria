import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Instagram, MessageCircle } from 'lucide-react';
import logoImg from '../../assets/logo.jpg'; 

const Navbar = ({ cartCount, onCartOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Detectar scroll para cambiar fondo
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Bloquear el scroll de la página cuando el menú está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/tienda', label: 'Tienda' },
    { to: '/nosotros', label: 'Nosotros' },
    { to: '/contacto', label: 'Contacto' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 + 0.3, duration: 0.5, ease: "easeOut" }
    })
  };

  return (
    <>
      {/* Z-INDEX CORREGIDO: 
         - z-[110]: Para que el Navbar (Logo y Botón X) esté SIEMPRE visible, incluso sobre el menú blanco.
      */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-[110] transition-all duration-300 ${
          scrolled && !mobileMenuOpen ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* LOGO + NOMBRE */}
          <Link to="/" className="flex items-center gap-3 group z-50 relative">
            <div className="relative overflow-hidden rounded-full w-10 h-10 md:w-12 md:h-12 border-2 border-transparent group-hover:border-mo-pink-200 transition-all">
              <img 
                src={logoImg} 
                alt="MO Indumentaria" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Si el menú está abierto, forzamos texto negro para que se vea sobre el fondo blanco */}
            <span className={`font-serif font-bold tracking-tight transition-colors z-50 ${
              (scrolled || mobileMenuOpen) ? 'text-black' : 'text-black'
            }`}>
              MO <span className="text-mo-pink-600">Indumentaria</span>
            </span>
          </Link>

          {/* LINKS DE ESCRITORIO (Oculto en móvil) */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-mo-pink-600 ${
                  location.pathname === link.to ? 'text-mo-pink-600 font-bold' : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ICONOS */}
          <div className="flex items-center gap-4 z-50">
            {/* Botón Carrito */}
            <button 
              onClick={onCartOpen}
              className="relative group p-2"
            >
              <ShoppingBag className={`w-6 h-6 transition-colors group-hover:text-mo-pink-600 ${
                (scrolled || mobileMenuOpen) ? 'text-black' : 'text-black'
              }`} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-mo-pink-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Botón Hamburguesa / Cerrar (Solo Móvil) */}
            <button 
              className="md:hidden p-2 text-black hover:text-mo-pink-600 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MENÚ MÓVIL FULL SCREEN 
         - z-[100]: Altísimo para tapar el botón de filtros (que tiene z-30).
         - El Navbar es z-[110] así que el botón de cerrar queda encima de esto.
      */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[100] bg-white flex flex-col justify-center items-center md:hidden"
          >
            {/* Decoración de fondo */}
            <div className="absolute top-20 right-0 w-64 h-64 bg-mo-pink-100 rounded-full blur-3xl opacity-50 -z-10" />
            <div className="absolute bottom-20 left-0 w-64 h-64 bg-gray-100 rounded-full blur-3xl opacity-50 -z-10" />

            {/* Lista de Enlaces */}
            <div className="flex flex-col space-y-8 text-center">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  custom={index}
                  variants={linkVariants}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-4xl font-serif font-bold transition-all duration-300 ${
                      location.pathname === link.to 
                        ? 'text-mo-pink-600 italic' 
                        : 'text-black hover:text-gray-500'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Redes Sociales al pie */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 flex gap-6"
            >
              <a href="#" className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-black hover:bg-mo-pink-600 hover:text-white transition-all">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://wa.me/549..." target="_blank" className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-black hover:bg-green-500 hover:text-white transition-all">
                <MessageCircle className="w-6 h-6" />
              </a>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;