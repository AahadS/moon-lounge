import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

const Card = ({ title, description, icon, className = '' }: CardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`bg-black/80 backdrop-blur-md border border-lounge-purple/20 
        rounded-lg p-6 shadow-lg hover:shadow-xl hover:border-lounge-purple/30 
        transition-all duration-300 cursor-pointer touch-action-manipulation ${className}`}
    >
      {icon && (
        <div className="text-lounge-purple mb-4 flex justify-center">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-serif text-white mb-3 text-center">
        {title}
      </h3>
      <p className="text-white/80 text-center">
        {description}
      </p>
    </motion.div>
  );
};

export default Card; 