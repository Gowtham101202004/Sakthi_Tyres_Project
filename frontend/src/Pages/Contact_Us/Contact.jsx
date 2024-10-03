import React from 'react'
import location from './locations.gif'
import './Contact.css'

function Contact() {
  return (
    <>
      <div className='location-container'>
        <img src={location} alt="location-gif"/>
        <h1>Our Location</h1>
      </div>
      <div className='contact-tyre-maps'>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.773075940275!2d77.2387215!3d11.496287200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba921e116079619%3A0x6797b0fa55c4d973!2sSakthi%20Tyres!5e0!3m2!1sen!2sin!4v1725442343931!5m2!1sen!2sin"
          width="60%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </>
  )
}

export default Contact