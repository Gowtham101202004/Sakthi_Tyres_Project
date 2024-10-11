import React from 'react';
import { useEffect } from 'react';

import './About.css'; 
import Tyre from './Sakthi-tyres.png'
import BQ from './best-quality.jpeg'
import BP from './best-price.jpg'
import Achievement from './achievement.jpg'
import "aos/dist/aos.css";
import AOS from 'aos';

function About() {
  
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 750,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div className='about-container'>
      <div data-aos="zoom-in" className='about-header'>
        <img src={Tyre} alt='Sakthi Tyres'/>
        <p>We are dedicated to providing the best quality tires and exceptional service.</p>
      </div>

      <div className='about-content'>
        <div data-aos="zoom-in-right" className='about-section'>
          <h2>Our Mission</h2>
          <img src={BQ} className='about-img' alt='Best Quality'/>
          <p>
            At Sakthi Tyres, our mission is to offer high-quality tires that ensure your safety on the road. We believe in
            delivering excellent customer service and building long-lasting relationships with our clients.
          </p>
        </div>

        <div data-aos="zoom-in-left" className='about-section'>
          <h2>Why Choose Us?</h2>
          <img src={BP} className='about-img' alt='Best Price'/>
          <p>
            We offer a wide range of tires from top brands at competitive prices. Our team of experts is always ready to help
            you find the perfect tires for your vehicle. With our fast and reliable service, we make sure that your vehicle
            is always ready for the road.
          </p>
        </div>

        <div data-aos="zoom-in-right" className='about-section'>
          <h2>Our History</h2>
          <img src={Achievement} className='about-img' alt='Best Quality'/>
          <p>
            Founded in 2004, Sakthi Tyres has grown from a small shop to a leading tire retailer in the region. Over the years,
            we have expanded our services and product range to meet the needs of our diverse clientele.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
