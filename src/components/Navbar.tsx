import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import CheckInModal from './ui/CheckInModal';

interface NavbarProps {
  isCheckedIn?: boolean;
  onCheckIn?: (name: string, phone: string) => void;
  onCheckOut?: () => void;
}

const Navbar = ({ isCheckedIn, onCheckIn, onCheckOut }: NavbarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCheckIn = (name: string, phone: string) => {
    onCheckIn?.(name, phone);
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

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-lounge-purple transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center gap-8">
            {!isCheckedIn ? (
              <>
                <a href="#about" className="text-white hover:text-lounge-purple transition-colors font-serif text-lg">
                  About
                </a>
                <a href="#flavors" className="text-white hover:text-lounge-purple transition-colors font-serif text-lg">
                  Flavors
                </a>
                <a href="#story" className="text-white hover:text-lounge-purple transition-colors font-serif text-lg">
                  Our Story
                </a>
                <motion.button
                  whileHover={{ y: -2 }}
                  onClick={() => setIsModalOpen(true)}
                  className="bg-lounge-purple hover:bg-lounge-purple/90 text-white px-6 py-2 rounded-lg 
                    font-serif text-lg shadow-lg hover:shadow-lounge-purple/20 hover:shadow-xl 
                    transition-all duration-300 border border-lounge-purple/30"
                >
                  Check-In
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ y: -2 }}
                onClick={onCheckOut}
                className="bg-lounge-purple px-6 py-2 rounded-md text-white font-serif"
              >
                Check-Out
              </motion.button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-lounge-purple/20"
            >
              <div className="flex flex-col items-center gap-4 py-4">
                {!isCheckedIn ? (
                  <>
                    <a href="#about" className="text-white hover:text-lounge-purple transition-colors font-serif text-lg">
                      About
                    </a>
                    <a href="#flavors" className="text-white hover:text-lounge-purple transition-colors font-serif text-lg">
                      Flavors
                    </a>
                    <a href="#story" className="text-white hover:text-lounge-purple transition-colors font-serif text-lg">
                      Our Story
                    </a>
                    <motion.button
                      whileHover={{ y: -2 }}
                      onClick={() => {
                        setIsModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="bg-lounge-purple hover:bg-lounge-purple/90 text-white px-6 py-2 rounded-lg 
                        font-serif text-lg shadow-lg hover:shadow-lounge-purple/20 hover:shadow-xl 
                        transition-all duration-300 border border-lounge-purple/30"
                    >
                      Check-In
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ y: -2 }}
                    onClick={onCheckOut}
                    className="bg-lounge-purple px-6 py-2 rounded-md text-white font-serif"
                  >
                    Check-Out
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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