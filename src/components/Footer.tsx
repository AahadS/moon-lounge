import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-sm py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img src="/moon-icon.svg" alt="Moon Icon" className="h-8 w-8" />
            <span className="ml-2 text-xl font-serif text-white">Moon Lounge</span>
          </div>
          <div className="text-gray-400 text-sm">
            © 2024 Moon Lounge. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 