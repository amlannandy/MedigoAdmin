import React from 'react';
import './style.css';

const CustomInput = props => {
  return (
    <div>
      <input {...props} className='custom-input' />
    </div>
  );
};

export default CustomInput;
