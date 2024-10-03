import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Michelin_Logo from '../../assets/Welcome/Dealers/michelin.png';
import Michelin_Tyre from '../../assets/Welcome/michelin.png';
import './about_styles.css';

function Michelin() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <div onClick={() => navigate(-1)} className='back-container'>
        <FontAwesomeIcon icon={faArrowLeft} className="left-arrow" />
      </div>

      <div className="brand-heading">
        <img src={Michelin_Logo} alt="Michelin Logo" className="brand-heading-img" />
        <h2>Innovation and Sustainability</h2>
      </div>
      <div className="brand-image">
        <img src={Michelin_Tyre} alt="Michelin Logo"/>
      </div>
      <div className="brand-description">
        <p>
          Michelin is a global leader in tyre manufacturing, renowned for innovation and commitment 
          to sustainability. Michelin tyres are crafted to offer superior performance while maintaining 
          an eco-friendly approach.
        </p>
      </div>
      <div className="brand-content">
        <p>
          Our dealership proudly stocks a wide range of Michelin tyres, including models that cater to 
          the diverse needs of modern vehicles. Michelin tyres are known for their durability, fuel efficiency, 
          and long tread life, making them a popular choice for discerning drivers.
        </p>
        <hr />
        <p>
          With a legacy of excellence and a forward-thinking approach, Michelin continues to produce tyres 
          that lead the market in quality and performance. We are proud to offer Michelin tyres to our customers.
        </p>
      </div>
      <button className="view-products-button">View Michelin Products</button>
    </div>
  );
}

export default Michelin;
