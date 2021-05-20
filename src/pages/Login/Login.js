import './style.css';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import React, { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../../images/logo.png';
import { login } from '../../store/actions/auth';
import formReducer from '../../utils/formReducer';
import CustomInput from '../../components/CustomInput/CustomInput';

const initialLoginData = {
  email: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useReducer(formReducer, initialLoginData);
  const { isLoading, error, isAuthenticated } = useSelector(
    state => state.auth
  );

  const loginHandler = e => {
    e.preventDefault();
    dispatch(login(loginData));
  };

  if (!isLoading && isAuthenticated) {
    return <Redirect to='/' />;
  }

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
            disabled={isLoading}
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
            disabled={isLoading}
            onChange={e =>
              setLoginData({ name: e.target.name, value: e.target.value })
            }
          />
          {error ? (
            <div className='error-message'>
              <small>{error}</small>
            </div>
          ) : null}
          <button disabled={isLoading} type='submit' className='btn'>
            Login
          </button>
        </form>
        <p className='lead'>
          Forgot your Password? Reset it{' '}
          <Link className='link' to='/forgot-password'>
            here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
