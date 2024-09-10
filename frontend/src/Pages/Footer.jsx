import React from 'react';
import './Footer.css';
import Sakthi from '../assets/Sakthi.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faXTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section footer-logo">
          <img className='tyre' src={Sakthi} alt="Sakthi Tyres Logo" />
          <div className='about-sakthi-tyres'>
            <h2>Sakthi Tyres</h2>
            <p>Your one-stop solution for all your tyre needs. We offer a wide range of tyres from top brands, ensuring safety, durability, and performance.</p>
          </div>
        </div>
        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/product">Products</a></li>
            <li><a href="/help">Services</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p><strong>Phone:</strong> 9443088649, 9363329176</p>
          <p><strong>Email:</strong> info@sakthityres.com</p>
          <p><strong>Address:</strong> 591, 1, Mysore Trunk Rd, South Rangasamuthram, Rangasamudram, Sathyamangalam, Tamil Nadu 638402.2003</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="footer-socials">
            <a className='face' href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a className='x-twit' href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faXTwitter} /></a>
            <a className='insta' href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
            <a className='linked' href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 Sakthi Tyres | All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;
