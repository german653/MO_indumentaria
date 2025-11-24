import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ fullScreen = false }) => {
  const Container = fullScreen ? 'div' : 'span';
  
  return (
    <Container className={fullScreen ? 'min-h-screen flex items-center justify-center' : 'inline-flex items-center justify-center'}>
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 border-4 border-mo-pink-200 rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-mo-pink-600 rounded-full" />
      </motion.div>
    </Container>
  );
};

export default LoadingSpinner;