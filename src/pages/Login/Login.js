import React from 'react';
import './style.css';

import Logo from '../../images/logo.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';

const Login = () => {
  return (
    <div className='container'>
      <div className='cover'>
        <img src={Logo} alt='' />
        <h1>MediGo</h1>
      </div>
      <div className='form-group'>
        <h1>Login</h1>
        <p>to manage your Clinic Records</p>
        <form>
          <CustomInput
            label='Name'
            placeholder='Enter your name'
            type='name'
            name='name'
          />
          <CustomInput
            label='Password'
            placeholder='Enter your name'
            type='name'
            name='name'
          />
          <CustomButton label='Login' onClick={() => console.log('Css')} />
        </form>
      </div>
    </div>
  );
};

export default Login;
