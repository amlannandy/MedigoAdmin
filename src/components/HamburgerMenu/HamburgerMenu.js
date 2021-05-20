import './style.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

const HamburgerMenu = () => {
  return (
    <Menu right>
      <Link className='nav-link' to='/'>
        Home
      </Link>
      <Link className='nav-link' to='/profile'>
        Profile
      </Link>
      <li>
        <button className='nav-link'>Logout</button>
      </li>
    </Menu>
  );
};

export default HamburgerMenu;
