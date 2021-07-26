import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from '../utils/privateRoute';
import LoadingSpinner from './layout/loadingSpinner';

const Loading = () => {
  return <LoadingSpinner />;
};

const Landing = Loadable({
  loader: () => import('./auth/landing'),
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
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <PrivateRoute path='/' component={Landing} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
