import './style.css';
import React from 'react';
import { Link } from 'react-router-dom';

import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

const CustomNavbar = props => {
  console.log(props);

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
      </ul>
      <HamburgerMenu />
    </nav>
  );
};

export default CustomNavbar;
