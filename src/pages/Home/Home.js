import React from 'react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import CustomNavbar from '../../components/CustomNavbar/CustomNavbar';
import DashboardTab from '../../components/DashboardTab/DashboardTab';

const Home = () => {
  const { isLoading, isAuthenticated } = useSelector(state => state.auth);

  if (!isLoading && !isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <Fragment>
      <CustomNavbar />
      <div className='container bg-light'>
        <DashboardTab />
      </div>
    </Fragment>
  );
};

export default Home;
