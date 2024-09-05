import React from 'react';
import './Help.css';
import tyre from './read_tyre.png';

function Help() {
  return (
    <>
      <div className='read-tyre'>
        <img src={tyre} alt="read tyre"/>
      </div>
    </>
  )
}

export default Help