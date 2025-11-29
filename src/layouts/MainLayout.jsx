import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Importamos useLocation
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Cart from '../components/common/Cart';

const MainLayout = ({ children, cart, setCart }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation(); // Obtenemos la ruta actual

  // Rutas donde NO queremos mostrar el Footer
  const hideFooterRoutes = ['/checkout', '/order-success'];
  
  // Verificamos si la ruta actual empieza con alguna de las rutas prohibidas
  const showFooter = !hideFooterRoutes.some(route => location.pathname.startsWith(route));

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const updateQuantity = (id, size, color, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.size === size && item.color === color
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id, size, color) => {
    setCart((prev) => 
      prev.filter((item) => !(item.id === id && item.size === size && item.color === color))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Pasamos cartCount y la función para abrir el carrito */}
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      
      <main className="min-h-screen">
        {children}
      </main>

      {/* Solo mostramos el Footer si showFooter es true */}
      {showFooter && <Footer />}

      {/* Componente del Carrito (Modal lateral) */}
      <Cart 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
};

export default MainLayout;