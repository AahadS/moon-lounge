import React, { useState } from 'react';
import Navbar from './components/Navbar';
import StarryBackground from './components/StarryBackground';
import Features from './components/Features';
import Footer from './components/Footer';
import HeroVideo from './components/HeroVideo';
import MainContent from './components/MainContent';
import MenuPage from './components/MenuPage';
import { Toaster } from 'react-hot-toast';

function App() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleCheckIn = (name: string, phone: string) => {
    setUserName(name);
    setIsCheckedIn(true);
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    setUserName('');
  };

  if (isCheckedIn) {
    return (
      <>
        <Toaster 
          position="bottom-center"
          containerStyle={{
            bottom: 40,
          }}
          toastOptions={{
            duration: 2000,
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid rgba(139, 92, 246, 0.3)',
            },
          }}
          reverseOrder={false}
          gutter={8}
          containerClassName="!bottom-4"
          limit={3}
        />
        <div className="relative min-h-screen overflow-hidden bg-black">
          <StarryBackground />
          <div className="relative z-10">
            <MenuPage userName={userName} onCheckOut={handleCheckOut} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-black">
        <StarryBackground />
        <Navbar onCheckIn={handleCheckIn} />
        <main className="relative flex-grow flex flex-col z-10">
          <HeroVideo />
          <MainContent />
          <Features />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App; 