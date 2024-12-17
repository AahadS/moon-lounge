import React from 'react';
import { motion } from 'framer-motion';

const StarryBackground = () => {
  // Generate random stars
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    size: Math.random() * 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 1 + Math.random() * 3,
    delay: Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
};

export default StarryBackground;