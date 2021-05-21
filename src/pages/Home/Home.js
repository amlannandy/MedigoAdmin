import React from 'react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';

import Clinic from '../Clinic/Clinic';
import Profile from '../Profile/Profile';
import Patients from '../Patients/Patients';
import Dashboard from '../Dashboard/Dashboard';
import Appointments from '../Appointments/Appointments';
import CustomNavbar from '../../components/CustomNavbar/CustomNavbar';
import DashboardTab from '../../components/DashboardTab/DashboardTab';

const Home = ({ location }) => {
  const { isLoading, isAuthenticated } = useSelector(state => state.auth);

  if (!isLoading && !isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <Fragment>
      <CustomNavbar url={location.pathname} />
      <Switch>
        <Route path='/profile' component={Profile} />
        <div className='container bg-light'>
          <DashboardTab url={location.pathname} />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/clinic/:id' component={Clinic} />
            <Route path='/patients/:id' component={Patients} />
            <Route path='/appointments' component={Appointments} />
          </Switch>
        </div>
      </Switch>
    </Fragment>
  );
};

export default Home;
