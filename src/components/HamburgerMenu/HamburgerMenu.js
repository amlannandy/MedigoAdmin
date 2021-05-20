import './style.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/actions/auth';

const HamburgerMenu = () => {
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(logOut());
  };

  return (
    <Menu right>
      <Link className='nav-link' to='/'>
        Home
      </Link>
      <Link className='nav-link' to='/profile'>
        Profile
      </Link>
      <li>
        <button className='nav-link' onClick={logOutHandler}>
          Logout
        </button>
      </li>
    </Menu>
  );
};

export default HamburgerMenu;
