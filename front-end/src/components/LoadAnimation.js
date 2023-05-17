import React from 'react';
import Lottie from 'lottie-react';
import drinksAnimation from '../assets/drinks.json';

function LoadAnimation() {
  return (
    <div>
      <Lottie
        animationData={ drinksAnimation }
        autoplay
        loop
        resizeMode="contain"
        className="w-72 h-72"
      />
    </div>
  );
}

export default LoadAnimation;
