import React from 'react';
import './style.css';

const CustomButton = ({ label, onClick }) => {
  return (
    <div>
      <button onClick={onClick}>{label}</button>
    </div>
  );
};

export default CustomButton;
