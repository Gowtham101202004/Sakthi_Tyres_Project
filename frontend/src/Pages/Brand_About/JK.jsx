import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import JK_Logo from '../../assets/Welcome/Dealers/jk.png';
import JK_Tyre from '../../assets/Welcome/jk.jpg';
import './about_styles.css';

function JK() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <div onClick={() => navigate(-1)} className='back-container'>
        <FontAwesomeIcon icon={faArrowLeft} className="left-arrow" />
      </div>

      <div className="brand-heading">
        <img src={JK_Logo} alt="JK Logo" className="brand-heading-img" />
        <h2>Pioneering Radial Technology</h2>
      </div>
      <div className="brand-image">
        <img src={JK_Tyre} alt="Apollo Logo"/>
      </div>

      <div className="brand-description">
        <p>
          JK Tyres is known for pioneering radial technology in India, delivering high-performance tyres across vehicle segments.
        </p>
      </div>

      <div className="brand-content">
        <p>
          Offering a broad selection of JK Tyres, our dealership ensures you find durable and efficient tyres that suit your needs. JK’s quality has earned the trust of drivers worldwide.
        </p>
        <hr />
        <p>
          We provide access to the latest JK Tyres at competitive prices, ensuring a reliable driving experience.
        </p>
      </div>

      <button className="view-products-button">View JK Products</button>
    </div>
  );
}

export default JK;
