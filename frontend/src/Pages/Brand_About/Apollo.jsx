import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Apollo_Logo from '../../assets/Welcome/Dealers/apollo.png';
import Apollo_Tyre from '../../assets/Welcome/Apollo_tyre.jpg';
import './about_styles.css';

function Apollo() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <div onClick={() => navigate(-1)} className='back-container'>
        <FontAwesomeIcon icon={faArrowLeft} className="left-arrow" />
      </div>

      <div className="brand-heading">
        <img src={Apollo_Logo} alt="Apollo Logo" className="brand-heading-img" />
        <h2>Leading Tyre Manufacturer</h2>
      </div>
      <div className="brand-image">
        <img src={Apollo_Tyre} alt="Apollo Tyre"/>
      </div>

      <div className="brand-description">
        <p>
          Apollo Tyres has grown to become one of the most prominent tyre manufacturers worldwide, 
          offering high-performance products across a wide range of vehicle segments. Known for their
          advanced technology, Apollo tyres deliver superior safety, durability, and efficiency.
        </p>
      </div>

      <div className="brand-content">
        <p>
          Our dealership proudly offers a vast selection of Apollo tyres for cars, trucks, and other vehicles. 
          With Apollo’s focus on quality and performance, we are able to provide customers with reliable 
          and long-lasting tyres. Apollo is a trusted name in the industry, and we ensure that our stock meets 
          your vehicle's needs with the best tyre options available.
        </p>
        <hr />
        <p>
          Selling in large volumes, Apollo tyres are widely appreciated by consumers and professionals alike.
          We are committed to making sure our customers have access to the latest and most innovative Apollo 
          products in the market.
        </p>
      </div>

      <button className="view-products-button">View Apollo Products</button>
    </div>
  );
}

export default Apollo;
