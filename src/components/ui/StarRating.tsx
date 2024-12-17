import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface StarRatingProps {
  placeId: string;  // Google Maps Place ID for Moon Lounge
}

const StarRating = ({ placeId }: StarRatingProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRatingClick = async (selectedRating: number) => {
    try {
      // Initialize Google Places API
      if (typeof google === 'undefined' || !google.maps || !google.maps.places) {
        await loadGooglePlacesAPI();
      }

      const auth2 = await google.accounts.oauth2.initTokenClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/place-reviews',
        callback: (response) => {
          if (response.access_token) {
            submitReview(selectedRating, response.access_token);
          }
        },
      });

      auth2.requestAccessToken();
    } catch (error) {
      console.error('Error initializing Google Sign-In:', error);
    }
  };

  const submitReview = async (rating: number, token: string) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/place/reviews/write/json?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          place_id: placeId,
          rating: rating,
        }),
      });

      if (response.ok) {
        setRating(rating);
        // Show success message or trigger confetti
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleRatingClick(star)}
          onMouseEnter={() => setHoveredRating(star)}
          onMouseLeave={() => setHoveredRating(0)}
          className="focus:outline-none"
        >
          <Star
            size={20}
            className={`
              ${hoveredRating >= star || rating >= star
                ? 'fill-lounge-purple text-lounge-purple'
                : 'text-lounge-purple'
              } transition-colors duration-200
            `}
          />
        </motion.button>
      ))}
    </div>
  );
};

export default StarRating; 