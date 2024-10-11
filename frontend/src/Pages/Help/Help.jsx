import React from 'react';
import './Help.css';
// import tyre from './read_tyre.png';
import help1 from './help1.jpg'
import help2 from './help2.jpg'

function Help() {
  return (
    <>
      {/* <div className='read-tyre'>
        <img src={tyre} alt="read tyre"/>
      </div> */}
      <div className='read-tyre'>
        <img src={help1} alt="help1" className='help-one'/>
      </div>
      <div className='read-tyre'>
        <img src={help2} alt="read tyre" className='help-one'/>
      </div>
    </>
  )
}

export default Help