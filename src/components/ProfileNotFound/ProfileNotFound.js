import './style.css';
import React from 'react';

import ProfileImage from '../../images/profile.png';

const ProfileNotFound = () => {
  return (
    <div className='profile-not-found'>
      <img src={ProfileImage} alt='' />
      <h1 className='text-primary'>Profile Not Found</h1>
      <p>Error loading your profile</p>
    </div>
  );
};

export default ProfileNotFound;
