import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
}

const Card = ({ title, description, icon }: CardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card p-6 text-center"
    >
      <div className="text-lounge-purple mb-4">{icon}</div>
      <h3 className="text-2xl font-serif text-white mb-3">{title}</h3>
      <div className="text-gray-400">{description}</div>
    </motion.div>
  );
};

export default Card; 