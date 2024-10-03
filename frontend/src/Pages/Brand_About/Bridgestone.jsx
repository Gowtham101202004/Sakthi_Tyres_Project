import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Bridgestone_Logo from '../../assets/Welcome/Dealers/bridgestone.png';
import Bridgestone_Tyre from '../../assets/Welcome/bridgestone.jpg';
import './about_styles.css';

function Bridgestone() {
  const navigate = useNavigate();
  return (
    <div className="about-container">
      <div onClick={() => navigate(-1)} className='back-container'>
        <FontAwesomeIcon icon={faArrowLeft} className="left-arrow" />
      </div>
      <div className="brand-heading">
      <img src={Bridgestone_Logo} alt="Bridgestone Logo" className="brand-heading-img" />
      <h2>Global Leader in Quality</h2>
      </div>
      <div className="brand-image">
        <img src={Bridgestone_Tyre} alt="Bridgestone Logo"/>
      </div>
      <div className="brand-description">
        <p>
          Bridgestone, a world-renowned brand, offers a wide range of tyres that excel in quality and performance. 
          From everyday vehicles to high-performance sports cars, Bridgestone tyres are trusted for their 
          reliability and safety.
        </p>
      </div>
      <div className="brand-content">
        <p>
          Our dealership is proud to offer a broad selection of Bridgestone tyres to meet the needs of various 
          customers. Whether you’re looking for superior handling, fuel efficiency, or safety, Bridgestone has 
          a solution for you.
        </p>
        <hr />
        <p>
          With our high-volume sales of Bridgestone tyres, we ensure that you get the latest models and best options 
          for your vehicle. Bridgestone continues to be a global leader, and we are excited to bring their products 
          to our customers.
        </p>
      </div>
      <button className="view-products-button">View Bridgestone Products</button>
    </div>
  );
}

export default Bridgestone;
