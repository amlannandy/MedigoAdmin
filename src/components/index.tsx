import React from 'react';
import Loadable from 'react-loadable';
import { Dimmer, Loader } from 'semantic-ui-react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import GuestRoute from '../utils/guestRoute';
import PrivateRoute from '../utils/privateRoute';

const Loading = () => {
  return (
    <Dimmer active>
      <Loader indeterminate>Loading...</Loader>
    </Dimmer>
  );
};

const Dashboard = Loadable({
  loader: () => import('./dashboard/index'),
  loading: Loading,
});

const Login = Loadable({
  loader: () => import('./auth/login'),
  loading: Loading,
});

const Register = Loadable({
  loader: () => import('./auth/register'),
  loading: Loading,
});

export default class Index extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <GuestRoute path='/login' component={Login} />
            <GuestRoute path='/register' component={Register} />
            <PrivateRoute path='/' component={Dashboard} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
