import React from 'react';
import { motion } from 'framer-motion';

const flavorsList = [
  {
    name: "Watermelon Chill",
    description: "Sweet and refreshing watermelon blend"
  },
  {
    name: "Zesty Lime",
    description: "Tangy citrus with a cool finish"
  },
  {
    name: "Purple Grape",
    description: "Rich grape with subtle sweetness"
  },
  {
    name: "Crisp Apple",
    description: "Fresh apple with hints of mint"
  },
  {
    name: "Double Mint",
    description: "Invigorating pure mint experience"
  },
  {
    name: "Berry Blast",
    description: "Mixed berry medley"
  }
];

const Flavors = () => {
  return (
    <section className="w-full py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl md:text-6xl font-serif text-white mb-4">Our Signature Flavors</h2>
        <p className="text-lounge-purple text-xl">Experience our premium shisha selections</p>
      </motion.div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flavorsList.map((flavor) => (
            <motion.div
              key={flavor.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ 
                duration: 0.5,
                hover: { 
                  duration: 0.1,
                  ease: "easeOut"
                }
              }}
              className="glass-card p-6 text-center cursor-pointer"
            >
              <h3 className="text-2xl font-serif text-white mb-3">{flavor.name}</h3>
              <p className="text-gray-400">{flavor.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Flavors; 