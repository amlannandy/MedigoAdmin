import './style.css';
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className='centre-spinner'>
      <div className='lds-facebook'>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
