import React from 'react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import CustomNavbar from '../../components/CustomNavbar/CustomNavbar';

const Home = () => {
  const { isLoading, isAuthenticated } = useSelector(state => state.auth);

  if (!isLoading && !isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <Fragment>
      <CustomNavbar />
    </Fragment>
  );
};

export default Home;
