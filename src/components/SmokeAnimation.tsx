import React from 'react';
import { motion } from 'framer-motion';

const SmokeAnimation = () => {
  return (
    <div className="relative w-full h-40 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="smoke-particle"
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: [0, 0.4, 0],
            y: [100, -100],
            x: [0, Math.sin((i + 1) * 45) * 50],
            scale: [1, 2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

export default SmokeAnimation; 