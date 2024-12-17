import React from 'react';
import Card from './Card';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const PrimeLocationCard = () => {
  const address = "1811 Lawrence Ave E, Scarborough, ON M1R 2Y3";
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <Card
      icon={<MapPin size={24} className="mx-auto text-lounge-purple" />}
      title="Prime Location"
      description={
        <div className="space-y-3">
          <p className="text-gray-400">Located in the heart of the city for your convenience</p>
          <p className="text-white text-sm font-serif">{address}</p>
          <motion.a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            className="inline-flex items-center gap-2 text-lounge-purple hover:text-white transition-colors duration-200 text-sm font-serif"
          >
            <span>Get Directions</span>
            <svg 
              className="w-3 h-3" 
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
      }
    />
  );
};

export default PrimeLocationCard;