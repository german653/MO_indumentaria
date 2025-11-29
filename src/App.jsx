import React, { useState, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast'; // Importante para las notificaciones

// Layouts
import MainLayout from './layouts/MainLayout';
// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import CartPage from './pages/Cart'; // Tu página de carrito actual
import Checkout from './pages/Checkout'; // <--- LA NUEVA PÁGINA QUE CREAMOS
import OrderSuccess from './pages/OrderSuccess'; // <--- AGREGAR ESTO

// --- COMPONENTE SCROLL TO TOP MEJORADO ---
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // 1. Desactivar la restauración automática del navegador
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // 2. Forzar scroll arriba instantáneamente
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
// ----------------------------------------

function AnimatedRoutes({ cart, setCart }) {
  const location = useLocation();

  return (
    // mode="wait" espera a que termine la animación de salida antes de entrar la nueva
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
        <Route path="/tienda" element={<Shop cart={cart} setCart={setCart} />} />
        <Route path="/producto/:slug" element={<ProductDetail cart={cart} setCart={setCart} />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/carrito" element={<CartPage cart={cart} setCart={setCart} />} />
        
        {/* NUEVA RUTA DE CHECKOUT */}
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <ScrollToTop />
      
      {/* Notificaciones Toast configuradas */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          className: '!bg-white !text-gray-900 !shadow-2xl !rounded-xl !border !border-gray-100 !px-6 !py-4 !font-medium',
          success: {
            iconTheme: { primary: '#10B981', secondary: '#fff' },
            style: { borderLeft: '4px solid #10B981' }
          },
          error: {
            iconTheme: { primary: '#EF4444', secondary: '#fff' },
            style: { borderLeft: '4px solid #EF4444' }
          },
        }}
      />

      <MainLayout cart={cart} setCart={setCart}>
        <AnimatedRoutes cart={cart} setCart={setCart} />
      </MainLayout>
    </Router>
  );
}

export default App;