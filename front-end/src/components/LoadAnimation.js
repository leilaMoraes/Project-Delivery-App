import React from 'react';
import Lottie from 'lottie-react';
import drinksAnimation from '../assets/drinks.json';

function LoadAnimation() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Lottie
        animationData={ drinksAnimation }
        autoplay
        loop
        className="w-72 h-72"
      />
    </div>
  );
}

export default LoadAnimation;
