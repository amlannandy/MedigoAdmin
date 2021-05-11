import React from 'react';
import './style.css';

const CustomButton = ({ label, onClick }) => {
  return (
    <div>
      <button className='custom-btn' onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export default CustomButton;
