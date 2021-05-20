import './style.css';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CustomInput from '../../components/CustomInput/CustomInput';
import { sendPasswordResetMail } from '../../store/actions/auth';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const { isLoading, isAuthenticated, error, message } = useSelector(
    state => state.auth
  );

  const sendResetPasswordMailHandler = e => {
    e.preventDefault();
    dispatch(sendPasswordResetMail(email));
  };

  if (!isLoading && isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='forgot-password-container'>
      <form
        onSubmit={sendResetPasswordMailHandler}
        className='forgot-password-form'>
        <h1>Forgot Password</h1>
        <p>
          Please enter your email address here where the reset link will be sent
        </p>
        <CustomInput
          required
          name='email'
          type='email'
          value={email}
          label='Email'
          placeholder='Enter email'
          disabled={isLoading}
          onChange={e => setEmail(e.target.value)}
        />
        {error ? (
          <div className='error-message'>
            <small>{error}</small>
          </div>
        ) : null}
        {message ? (
          <div className='success-message'>
            <small>{message}</small>
          </div>
        ) : null}
        <button type='submit' className='btn'>
          Send Password Reset Email
        </button>
        <Link to='/login' className='btn btn-dark'>
          Go back to Login
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
