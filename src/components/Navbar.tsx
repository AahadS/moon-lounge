import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CheckInModal from './ui/CheckInModal';

interface NavbarProps {
  onCheckIn: (name: string, phone: string) => void;
}

const Navbar = ({ onCheckIn }: NavbarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckIn = (name: string, phone: string) => {
    onCheckIn(name, phone);
    setIsModalOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <img src="/moon-icon.svg" alt="Moon Icon" className="h-8 w-8 text-lounge-purple" />
            <span className="ml-2 text-white text-xl font-serif">Moon Lounge</span>
          </div>
          <div className="flex items-center gap-8">
            <a 
              href="#about" 
              className="text-white hover:text-lounge-purple transition-colors font-serif text-lg"
            >
              About
            </a>
            <a 
              href="#flavors" 
              className="text-white hover:text-lounge-purple transition-colors font-serif text-lg"
            >
              Flavors
            </a>
            <a 
              href="#story" 
              className="text-white hover:text-lounge-purple transition-colors font-serif text-lg"
            >
              Our Story
            </a>
            <motion.button
              whileHover={{ y: -2 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-lounge-purple px-6 py-2 rounded-md text-white font-serif"
            >
              Check-In
            </motion.button>
          </div>
        </div>
      </div>

      <CheckInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCheckIn}
      />
    </nav>
  );
};

export default Navbar;