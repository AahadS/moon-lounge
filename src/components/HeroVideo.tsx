import React from 'react';
import { motion } from 'framer-motion';
import SmokeAnimation from './SmokeAnimation.tsx';

const HeroVideo = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black z-10" />
      <video
        autoPlay
        loop
        muted
        preload="auto"
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/moonLounge.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-serif text-white mb-4 text-center"
        >
          Moon Lounge
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-lounge-purple mb-8 text-center"
        >
          Experience the Art of Relaxation
        </motion.p>

        <SmokeAnimation />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center gap-6 mt-8"
        >
          <p className="text-white/80 text-lg md:text-xl text-center max-w-2xl px-4">
            Immerse yourself in an atmosphere where modern luxury meets mystical charm. 
            Our premium shisha selections and expert service create an unforgettable experience.
          </p>
          
          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ y: 0, scale: 0.98 }}
            className="bg-lounge-purple/80 hover:bg-lounge-purple text-white px-8 py-3 rounded-lg 
              font-serif text-lg shadow-lg hover:shadow-lounge-purple/20 hover:shadow-xl 
              transition-all duration-300 border border-lounge-purple/30"
          >
            Explore Our Flavors
          </motion.button>
        </motion.div>
      </div>
      
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
};

export default HeroVideo; 