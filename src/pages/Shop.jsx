import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import ProductGrid from '../components/shop/ProductGrid';
import Filters from '../components/shop/Filters';
import SortBar from '../components/shop/SortBar';
import { products, categories } from '../data/products';
import { fadeInUp } from '../utils/animations';

const Shop = ({ cart, setCart }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 25000]);

  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by price range
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
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
        // Featured - bestsellers first
        result.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
    }

    setFilteredProducts(result);
  }, [selectedCategory, sortBy, priceRange]);

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-20 px-6">
        {/* Hero Section */}
        <div className="container mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6"
            >
              Nuestra <span className="italic text-mo-pink-600">Tienda</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600"
            >
              Descubre cada pieza de nuestra colección exclusiva
            </motion.p>
          </motion.div>
        </div>

        <div className="container mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="lg:col-span-1"
            >
              <Filters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
              />
            </motion.div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
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
      </div>
    </PageTransition>
  );
};

export default Shop;