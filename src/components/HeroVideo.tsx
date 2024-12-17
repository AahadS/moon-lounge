import React from 'react';

const HeroVideo = () => {
  return (
    <div className="relative w-full h-[50vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black z-10" />
      <video
        autoPlay
        loop
        muted
        preload="auto"
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/moonLounge.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
};

export default HeroVideo; 