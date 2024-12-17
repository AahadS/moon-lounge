import React from 'react';
import { motion } from 'framer-motion';

const StarryBackground = () => {
  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] bg-white rounded-full"
          initial={{ opacity: Math.random() }}
          animate={{
            opacity: [Math.random() * 0.3, Math.random(), Math.random() * 0.3],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default StarryBackground;