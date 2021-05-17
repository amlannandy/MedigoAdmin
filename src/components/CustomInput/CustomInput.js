import React from 'react';
import './style.css';

const CustomInput = props => {
  return (
    <div>
      <label htmlFor={props.label}>{props.label}</label>
      <input {...props} />
    </div>
  );
};

export default CustomInput;
