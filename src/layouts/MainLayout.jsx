import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Cart from '../components/common/Cart';

const MainLayout = ({ children, cart, setCart }) => {
  const [cartOpen, setCartOpen] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-mo-pink-50 via-white to-mo-pink-100">
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      
      <main className="min-h-screen">
        {children}
      </main>
      
      <Footer />
      
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