import React from 'react';
import { motion } from 'framer-motion';
import Flavors from './Flavors';

const MainContent = () => {
  return (
    <div className="flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-16"
      >
        <h1 className="text-6xl md:text-8xl font-serif mb-4 text-white">Moon Lounge</h1>
        <p className="text-xl md:text-2xl text-lounge-purple">Experience the Art of Relaxation</p>
      </motion.div>
      <Flavors />
    </div>
  );
};

export default MainContent; 