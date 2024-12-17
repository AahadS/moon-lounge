import React from 'react';

const ShishaDisplay = () => (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-64 h-[500px] pointer-events-none">
      <img
        src="/lovable-uploads/de2f4ac9-7bfa-4500-b1e8-9b766a31770f.png"
        alt="Shisha"
        className="w-full h-full object-contain opacity-80"
        style={{
          filter: "brightness(0.9) contrast(1.1)",
          mixBlendMode: "luminosity",
        }}
      />
    </div>
  );
  
  export default ShishaDisplay;