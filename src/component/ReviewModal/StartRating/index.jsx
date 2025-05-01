import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { IoStar } from 'react-icons/io5';

export const StarRating = ({ 
  totalStars = 5, 
  onRatingChange,
  starSize = 'text-4xl',
  activeColor = 'text-yellow-400',
  inactiveColor = 'text-gray-300'
}) => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [hoveredStars, setHoveredStars] = useState(0);

  const handleStarClick = (starIndex) => {
    setSelectedStars(starIndex);
    if (onRatingChange) {
      onRatingChange(starIndex);
    }
  };

  return (
    <div className="flex gap-3" onMouseLeave={() => setHoveredStars(0)}>
      {[...Array(totalStars)].map((_, index) => {
        const starNumber = index + 1;
        const isActive = starNumber <= selectedStars || starNumber <= hoveredStars;
        
        return (
          <button
            key={index}
            type="button"
            className={`${starSize} ${isActive ? activeColor : inactiveColor} cursor-pointer transition-colors`}
            onClick={() => handleStarClick(starNumber)}
            onMouseEnter={() => setHoveredStars(starNumber)}
            aria-label={`Rate ${starNumber} out of ${totalStars}`}
          >
            {/* ★ */}
            <IoStar/>
          </button>
        );
      })}
    </div>
  );
};

