import './style.css';
import React from 'react';
import { useSelector } from 'react-redux';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ProfileNotFound from '../../components/ProfileNotFound/ProfileNotFound';

const Profile = () => {
  const { user, isLoading } = useSelector(state => state.auth);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <ProfileNotFound />;
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
