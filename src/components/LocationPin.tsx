import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const LocationPin = () => {
  const address = "1811 Lawrence Ave E, Scarborough, ON M1R 2Y3";
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <section className="w-full py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="text-lounge-purple mb-6"
          >
            <MapPin size={40} />
          </motion.div>
          
          <p className="text-white text-lg mb-4 font-serif">{address}</p>
          
          <motion.a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            className="inline-flex items-center gap-2 text-lounge-purple hover:text-white transition-colors duration-300 font-serif"
          >
            <span>Get Directions</span>
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
              />
            </svg>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default LocationPin; 