import './style.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logOut } from '../../store/actions/auth';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

const CustomNavbar = ({ url }) => {
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(logOut());
  };

  let homeClass = 'nav-link';
  if (url == '/') {
    homeClass += ' current';
  }

  let profileClass = 'nav-link';
  if (url.startsWith('/profile')) {
    profileClass += ' current';
  }

  return (
    <nav className='navbar container'>
      <Link to='/'>
        <h1>MediGo</h1>
      </Link>
      <ul>
        <li>
          <Link className={homeClass} to='/'>
            Home
          </Link>
        </li>
        <li>
          <Link className={profileClass} to='/profile'>
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
