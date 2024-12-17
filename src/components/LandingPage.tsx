import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import StarryBackground from './StarryBackground';
import CheckInModal from './ui/CheckInModal';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5, scale: 1.02 }}
    whileTap={{ y: -2 }}
    className="bg-black/40 backdrop-blur-sm border border-lounge-purple/20 rounded-lg p-6 text-center"
  >
    <div className="text-lounge-purple mb-4 text-2xl">{icon}</div>
    <h3 className="text-xl font-serif text-white mb-2">{title}</h3>
    <p className="text-white/70 text-sm">{description}</p>
  </motion.div>
);

const LandingPage = ({ onCheckIn }: { onCheckIn: (name: string, phone: string) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckIn = (name: string, phone: string) => {
    onCheckIn(name, phone);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-0 bg-black">
        <StarryBackground />
      </div>
      <div className="relative z-10">
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-24 max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-serif mb-4 text-white font-bold">
              Moon Lounge
            </h1>
            <p className="text-xl md:text-2xl text-lounge-purple mb-16">
              Experience the Art of Relaxation
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <FeatureCard
                icon={<span className="text-4xl">🌙</span>}
                title="Celestial Ambiance"
                description="Immerse yourself in our carefully curated atmosphere where modern luxury meets mystical charm"
              />
              <FeatureCard
                icon={<span className="text-4xl">✨</span>}
                title="Premium Selection"
                description="Discover our exclusive collection of hand-picked flavors and premium shisha varieties"
              />
              <FeatureCard
                icon={<span className="text-4xl">🌌</span>}
                title="Expert Service"
                description="Let our skilled staff guide you through an unforgettable journey of taste and relaxation"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-32"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Our Signature Flavors
            </h2>
            <p className="text-xl text-lounge-purple mb-12">
              Experience our premium shisha selections
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ y: -5 }}
                whileTap={{ y: -2 }}
                className="bg-black/80 backdrop-blur-md border border-lounge-purple/20 rounded-lg p-6"
              >
                <h3 className="text-2xl font-serif text-white mb-2">Watermelon Chill</h3>
                <p className="text-white/70">Sweet and refreshing watermelon blend</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                whileTap={{ y: -2 }}
                className="bg-black/80 backdrop-blur-md border border-lounge-purple/20 rounded-lg p-6"
              >
                <h3 className="text-2xl font-serif text-white mb-2">Zesty Lime</h3>
                <p className="text-white/70">Tangy citrus with a cool finish</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                whileTap={{ y: -2 }}
                className="bg-black/80 backdrop-blur-md border border-lounge-purple/20 rounded-lg p-6"
              >
                <h3 className="text-2xl font-serif text-white mb-2">Purple Grape</h3>
                <p className="text-white/70">Rich grape with subtle sweetness</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-32"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
              Are you ready to place your order?
            </h2>
            <motion.button
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ y: 0, scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-lounge-purple hover:bg-lounge-purple/90 text-white px-12 py-4 rounded-lg 
                font-serif text-xl shadow-lg hover:shadow-lounge-purple/20 hover:shadow-xl 
                transition-all duration-300 border border-lounge-purple/30"
            >
              Check-In Now
            </motion.button>
          </motion.div>
        </div>

        <CheckInModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCheckIn}
        />
      </div>
    </>
  );
};

export default LandingPage;