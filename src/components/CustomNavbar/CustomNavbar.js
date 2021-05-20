import './style.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { logOut } from '../../store/actions/auth';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

const CustomNavbar = props => {
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(logOut());
  };

  return (
    <nav className='navbar container'>
      <div>
        <h1>MediGo</h1>
      </div>
      <ul>
        <li>
          <Link className='nav-link' to='/'>
            Home
          </Link>
        </li>
        <li>
          <Link className='nav-link' to='/profile'>
            Profile
          </Link>
        </li>
        <li>
          <button className='nav-link' onClick={logOutHandler}>
            Logout
          </button>
        </li>
      </ul>
      <HamburgerMenu />
    </nav>
  );
};

export default CustomNavbar;
