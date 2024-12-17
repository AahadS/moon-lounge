import React from 'react';
import PremiumExperienceCard from './ui/PremiumExperienceCard';
import PrimeLocationCard from './ui/PrimeLocationCard';
import LateHoursCard from './ui/LateHoursCard';

const Features = () => {
  return (
    <section className="w-full bg-black py-16 mb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PremiumExperienceCard />
          <PrimeLocationCard />
          <LateHoursCard />
        </div>
      </div>
    </section>
  );
};

export default Features;