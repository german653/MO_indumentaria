import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import ProductGrid from '../components/shop/ProductGrid';
import Filters from '../components/shop/Filters';
import SortBar from '../components/shop/SortBar';
import { products } from '../data/products';

const Shop = ({ cart, setCart }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 100000]); 
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Lógica de Filtrado y Ordenamiento
  useEffect(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id); 
        break;
      default: 
        result.sort((a, b) => (b.featured === true ? 1 : -1));
        break;
    }

    setFilteredProducts(result);
  }, [selectedCategory, priceRange, sortBy]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-white pt-24 pb-20">
        
        {/* 1. HEADER SIMPLE */}
        <div className="container mx-auto px-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Colección <span className="italic text-mo-pink-600">2024</span>
            </h1>
            <p className="text-gray-500 text-lg">
              Encuentra tu estilo perfecto para entrenar.
            </p>
          </motion.div>
        </div>

        <div className="container mx-auto px-6">
          
          {/* BARRA DE CONTROL MÓVIL (Filtrar) 
              Cambios: Eliminado 'sticky', 'top-[90px]', 'z-20', 'shadow' y 'backdrop-blur'.
              Ahora es un bloque normal que se queda arriba.
          */}
          <div className="lg:hidden flex gap-4 mb-6 py-4 -mx-6 px-6 border-b border-gray-100">
            <button 
              onClick={() => setMobileFiltersOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 rounded-full font-bold text-sm active:scale-95 transition-transform"
            >
              <Filter className="w-4 h-4" />
              Filtrar Productos
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* 2. SIDEBAR FILTROS (Desktop) */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32">
                <Filters 
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  priceRange={priceRange}
                  onPriceChange={setPriceRange}
                />
              </div>
            </aside>

            {/* 3. GRILLA DE PRODUCTOS */}
            <div className="flex-1">
              <SortBar 
                sortBy={sortBy} 
                onSortChange={setSortBy} 
                productsCount={filteredProducts.length} 
              />
              
              <ProductGrid 
                products={filteredProducts} 
                cart={cart}
                setCart={setCart} 
              />
            </div>

          </div>
        </div>

        {/* 4. MENÚ LATERAL DE FILTROS (MÓVIL) */}
        <AnimatePresence>
          {mobileFiltersOpen && (
            <>
              {/* Fondo Oscuro */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileFiltersOpen(false)}
                className="fixed inset-0 bg-black/50 z-[120] lg:hidden backdrop-blur-sm"
              />
              
              {/* Drawer Lateral */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-y-0 right-0 z-[130] w-full max-w-xs bg-white shadow-2xl p-6 lg:hidden overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold font-serif">Filtros</h3>
                  <button 
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <Filters 
                  selectedCategory={selectedCategory}
                  onCategoryChange={(cat) => {
                    setSelectedCategory(cat);
                  }}
                  priceRange={priceRange}
                  onPriceChange={setPriceRange}
                />
                
                <button 
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full mt-8 bg-black text-white py-4 rounded-full font-bold shadow-lg"
                >
                  Ver Resultados
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
};

export default Shop;