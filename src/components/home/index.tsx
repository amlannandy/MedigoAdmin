import './css/index.css';
import React from 'react';
import Loadable from 'react-loadable';
import { Route, Switch } from 'react-router-dom';
import { Container, Dimmer, Loader } from 'semantic-ui-react';

import Navbar from '../layout/navbar';

const Loading = () => {
  return (
    <Dimmer active>
      <Loader indeterminate>Loading...</Loader>
    </Dimmer>
  );
};

const Dashboard = Loadable({
  loader: () => import('../dashboard/index'),
  loading: Loading,
});

const Profile = Loadable({
  loader: () => import('../profile/index'),
  loading: Loading,
});

const Settings = Loadable({
  loader: () => import('../settings/index'),
  loading: Loading,
});

class Index extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Container className='home-container'>
          <Switch>
            <Route path='/settings' component={Settings} />
            <Route path='/profile' component={Profile} />
            <Route path='/' component={Dashboard} />
          </Switch>
        </Container>
      </React.Fragment>
    );
  }
}

export default Index;
