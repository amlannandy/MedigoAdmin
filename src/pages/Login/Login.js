import React from 'react';
import './style.css';

import Logo from '../../images/logo.png';
import LoginCover from '../../images/login.jpg';
import CustomInput from '../../components/CustomInput/CustomInput';

const Login = () => {
  return (
    <div className='login-flex-container'>
      <div className='img-section'>
        <img src={LoginCover} alt='' />
      </div>
      <div className='form-section'>
        <h1>
          <img src={Logo} alt='' />
        </h1>
        <h1>Login</h1>
        <p className='lead'>Manage your appointments and clinic data here</p>
        <CustomInput label='Email' placeholder='Enter email' />
        <CustomInput label='Password' placeholder='Enter password' />
        <button className='btn'>Login</button>
        <p className='lead'>
          Forgot your Password? Reset it{' '}
          <a className='link' href='#'>
            here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
