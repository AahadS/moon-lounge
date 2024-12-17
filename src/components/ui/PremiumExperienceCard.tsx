import React from 'react';
import Card from './Card';
import { Star } from 'lucide-react';
import StarRating from './StarRating';

const PremiumExperienceCard = () => {
  const placeId = "ChIJlaCVGou0K4gREkBE8qMbHRM"; // Moon Lounge's Google Place ID

  return (
    <Card
      icon={<Star size={24} className="mx-auto text-lounge-purple" />}
      title="Premium Experience"
      description={
        <div className="space-y-3">
          <p className="text-gray-400">Premium shisha selection curated for you</p>
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-serif text-white">Rate your experience</p>
            <StarRating placeId={placeId} />
          </div>
        </div>
      }
    />
  );
};

export default PremiumExperienceCard;