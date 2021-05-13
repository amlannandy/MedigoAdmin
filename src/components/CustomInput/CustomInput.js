import React from 'react';
import './style.css';

const CustomInput = props => {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <input {...props} />
    </div>
  );
};

export default CustomInput;
