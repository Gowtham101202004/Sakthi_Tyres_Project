import React, { useState, useEffect } from 'react';
import Michelin from '../assets/Welcome/michelin.jpg';
import Bridgestone from '../assets/Welcome/bridgestone.jpg';
import JK from '../assets/Welcome/jk.jpg';
import Tyre from '../assets/Welcome/tyre2.png'
import './Welcome.css';

function Welcome() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [Michelin, Bridgestone, JK];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      <div className='slider-container'>
        <img src={images[currentIndex]} className='slider-image' alt='Tyres' />
      </div>
      <div className='grid-container'>
        <div className='grid-item'>
          <img src={Michelin} className='tyre-image' alt='Tyres' />
        </div>
        <div className='grid-item'>
          <img src={Bridgestone} className='tyre-image' alt='Tyres' />
        </div>
        <div className='grid-item'>
          <img src={JK} className='tyre-image' alt='Tyres' />
        </div>
      </div>
      <div className='tyre-quote-container'>
        <div className='tyre-quote'>
          <img src={Tyre} alt='tyre'/>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
