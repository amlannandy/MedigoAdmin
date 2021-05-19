import './style.css';
import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';

import Logo from '../../images/logo.png';
import formReducer from '../../utils/formReducer';
import CustomInput from '../../components/CustomInput/CustomInput';

const initialLoginData = {
  email: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useReducer(formReducer, initialLoginData);

  const loginHandler = e => {
    e.preventDefault();
    const { email, password } = loginData;
    console.log(email);
    console.log(password);
  };

  return (
    <div className='login-flex-container'>
      <div className='img-section'></div>
      <div className='form-section'>
        <h1>
          <img src={Logo} alt='' />
        </h1>
        <h1>Login</h1>
        <p className='lead'>Manage your appointments and clinic data here</p>
        <form onSubmit={loginHandler}>
          <CustomInput
            required
            name='email'
            type='email'
            value={loginData.email}
            label='Email'
            placeholder='Enter email'
            onChange={e =>
              setLoginData({ name: e.target.name, value: e.target.value })
            }
          />
          <CustomInput
            required
            name='password'
            type='password'
            value={loginData.password}
            label='Password'
            placeholder='Enter password'
            onChange={e =>
              setLoginData({ name: e.target.name, value: e.target.value })
            }
          />
          <button type='submit' className='btn'>
            Login
          </button>
        </form>
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
