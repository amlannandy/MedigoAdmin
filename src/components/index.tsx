import React from 'react';
import Loadable from 'react-loadable';
import { Dimmer, Loader } from 'semantic-ui-react';
import { BrowserRouter, Switch } from 'react-router-dom';

import GuestRoute from '../utils/guestRoute';
import PrivateRoute from '../utils/privateRoute';

const Loading = () => {
  return (
    <Dimmer active>
      <Loader indeterminate>Loading...</Loader>
    </Dimmer>
  );
};

const Home = Loadable({
  loader: () => import('./home/index'),
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
            <PrivateRoute path='/' component={Home} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
