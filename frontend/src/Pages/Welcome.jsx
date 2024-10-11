import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

import Michelin_Ads from '../assets/Welcome/michelin_ads.png';
import Bridgestone_ads from '../assets/Welcome/bridgestone_ads.jpg';

import Michelin from '../assets/Welcome/michelin.png';
import Bridgestone from '../assets/Welcome/bridgestone.jpg';
import Apollo from '../assets/Welcome/Apollo.jpeg';
import JK from '../assets/Welcome/jk.jpg';
import Tyre from '../assets/Welcome/tyre2.png';
import Apollo_Tyre from '../assets/Welcome/Apollo_tyre.jpg';

import "aos/dist/aos.css";
import AOS from 'aos';

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
  const navigate = useNavigate();

  const images = [Michelin_Ads, Bridgestone_ads, JK, Apollo];

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 750,
      easing: "ease-out-cubic",
    });
  }, []);  

  const handleApolloClick = () => {
    navigate('/apollo');
  };
  
  const handleJKClick = () => {
    navigate('/jk');
  };
  
  const handleMichelinClick = () => {
    navigate('/michelin');
  };
  
  const handleBridgestoneClick = () => {
    navigate('/bridgestone');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
    <div data-aos="zoom-in">
      <div className='slider-container'>
        <img src={images[currentIndex]} className='slider-image' alt='Tyres' />
      </div>
      <div data-aos="fade-up" className='grid-container'>
        <div className='grid-item'>
          <img src={Apollo_Tyre} className='tyre-image' onClick={handleApolloClick} alt='Tyres' />
        </div>
        <div className='grid-item'>
          <img src={Michelin} className='tyre-image' onClick={handleMichelinClick} alt='Tyres' />
        </div>
        <div className='grid-item'>
          <img src={Bridgestone} className='tyre-image' onClick={handleBridgestoneClick} alt='Tyres' />
        </div>
        <div className='grid-item'>
          <img src={JK} className='tyre-image' onClick={handleJKClick} alt='Tyres' />
        </div>
      </div>
      <h1 className='dealership-title'>Our Dealerships</h1>
      <div data-aos="zoom-out" className='dealership'>
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
          <img data-aos="fade-right" src={Tyre} alt='tyre'/>
          <h1 data-aos="fade-left">BAD ATTITUDE</h1>
          <br />
          <h2 data-aos="fade-left">is like a flat tyre, <br />you can't move ahead <br />until it is changed.</h2>
        </div>
      </div>
    </div>
    <div className='maps'>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.773075940275!2d77.2387215!3d11.496287200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba921e116079619%3A0x6797b0fa55c4d973!2sSakthi%20Tyres!5e0!3m2!1sen!2sin!4v1725442343931!5m2!1sen!2sin"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    </>
  );
}

export default Welcome;
