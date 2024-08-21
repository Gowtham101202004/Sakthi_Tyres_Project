import React, { useState, useEffect } from 'react';
import Michelin from '../assets/Welcome/michelin.jpg';
import Bridgestone from '../assets/Welcome/bridgestone.jpg';
import JK from '../assets/Welcome/jk.jpg';
import Tyre from '../assets/Welcome/tyre2.png';

import apollo from '../assets/Welcome/Dealers/apollo.png';
import bridgestone from '../assets/Welcome/Dealers/bridgestone.png';
import continental from '../assets/Welcome/Dealers/continental.png';
import firestone from '../assets/Welcome/Dealers/firestone.png';
import goodyear from '../assets/Welcome/Dealers/goodyear.png';
import jk from '../assets/Welcome/Dealers/jk.png';
import mrf from '../assets/Welcome/Dealers/mrf.png';
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
      <h1 className='dealership-title'>Our Dealerships</h1>
      <div className='dealership'>
        <img src={apollo} alt='apollo'/>
        <img src={bridgestone} alt='bridgestone'/>
        <img src={continental} alt='continental'/>
        <img src={firestone} alt='firestone'/>
        <img src={goodyear} alt='goodyear'/>
        <img src={jk} alt='jk'/>
        <img src={mrf} alt='mrf'/>
      </div>
      <div className='tyre-quote-container'>
        <div className='tyre-quote'>
          <img src={Tyre} alt='tyre'/>
          <h1>BAD ATTITUDE</h1>
          <br></br>
          <h2>is like a flat tyre, <br></br>you can't move ahead <br></br>until it is changed.</h2>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
