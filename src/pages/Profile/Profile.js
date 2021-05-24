import './style.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const { user, isLoading } = useSelector(state => state.auth);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (!user) {
    return <h1>Profile not found</h1>;
  }

  return (
    <div className='container'>
      <div className='upper-profile'>
        <img src={user.imageUrl} alt='' className='profile-picture' />
        <div className='upper-profile-right-section'>
          <h3>{user.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;
